<!-- 分类页 -->
<template>
  <div class="classifyView">
    <!-- 导航栏 -->
    <van-nav-bar title="分类" left-arrow @click-left="goBack" :fixed="true" />
    <!-- 加载显示动画 -->
    <van-loading
      type="spinner"
      v-if="!allLabel"
      style="margin-top: 1.5467rem"
    />
    <!-- 分类盒 -->
    <div class="classifyBox">
      <!-- 全部style分类 -->
      <div class="allClassify" v-if="allLabel">
        <div
          class="allClassifyItem"
          :class="allClassifyId == -1 ? 'active' : ''"
          @click="chooseAllClassifyall"
        >
          全部
        </div>
        <div
          class="allClassifyItem"
          :class="item.id == allClassifyId ? 'active' : ''"
          v-for="(item, index) in allLabel.styles"
          :key="index"
          @click="chooseThisClassify(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 全部地区分类 -->
      <div class="areaClassify" v-if="allLabel">
        <div
          class="areaClassifyItem"
          :class="areaClassifyId == -1 ? 'active' : ''"
          @click="chooseAreaClassifyall"
        >
          全部
        </div>
        <div
          class="areaClassifyItem"
          v-for="(item, index) in allLabel.areas"
          :key="index"
          :class="item.id == areaClassifyId ? 'active' : ''"
          @click="chooseThisAreaClassify(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 是否完结分类 -->
      <div class="isFinishClassify" v-if="allLabel">
        <div
          class="isFinishClassifyItem"
          :class="isFinishClassifyId == -1 ? 'active' : ''"
          @click="chooseisFinishClassifyall"
        >
          全部
        </div>
        <div
          class="isFinishClassifyItem"
          v-for="(item, index) in allLabel.status"
          :key="index"
          :class="item.id == isFinishClassifyId ? 'active' : ''"
          @click="chooseThisstatusClassify(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 是否需要付费 -->
      <div class="needPayClassify" v-if="allLabel">
        <div
          class="needPayClassifyItem"
          :class="needPayClassifyId == -1 ? 'active' : ''"
          @click="chooseneedPayClassifyall"
        >
          全部
        </div>
        <div
          class="needPayClassifyItem"
          v-for="(item, index) in allLabel.prices"
          :key="index"
          :class="item.id == needPayClassifyId ? 'active' : ''"
          @click="chooseThisneedPayClassify(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <!-- 人气分类 -->
      <div class="ordersClassify" v-if="allLabel">
        <div
          class="ordersClassifyItem"
          v-for="(item, index) in allLabel.orders"
          :key="index"
          :class="item.id == ordersClassifyId ? 'active' : ''"
          @click="chooseThisOrdersClassify(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- 漫画列表 -->
    <van-loading type="spinner" v-if="!comicList" />
    <div class="comicList" v-if="comicList && allLabel">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="comicItem"
          v-for="(item, index) in comicList"
          :key="index"
          v-show="comicList"
          @click="ToComicDetails(item.season_id)"
        >
          <div class="comicImg">
            <img :src="item.vertical_cover + '@114w.jpg'" alt="" />
          </div>
          <div class="comicName">{{ item.title }}</div>
          <div class="updataed" v-if="item.is_finish == 1">
            [完结]共{{ item.last_ord }}话
          </div>
          <div class="updataed" v-if="item.is_finish == 0">
            更新至{{ item.last_ord }}话
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { GetallLabel, GetClassPage } from "@/api/classify";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      allLabel: "",
      allClassifyId: -1,
      areaClassifyId: -1,
      isFinishClassifyId: -1,
      needPayClassifyId: -1,
      ordersClassifyId: 0,
      comicList: [],
      pageNum: 0,
      loading: false,
      finished: false,
    };
  },
  //监听属性 类似于data概念
  computed: {
    allId() {
      const {
        allClassifyId,
        areaClassifyId,
        isFinishClassifyId,
        needPayClassifyId,
        ordersClassifyId,
      } = this;
      return {
        allClassifyId,
        areaClassifyId,
        isFinishClassifyId,
        needPayClassifyId,
        ordersClassifyId,
      };
    },
  },
  //监控data中的数据变化
  watch: {
    allId: function (newV) {
      console.log("加载漫画列表中...");
      console.log("新数据", newV);
      GetClassPage({
        styleId: newV.allClassifyId,
        areaId: newV.areaClassifyId,
        isFinish: newV.isFinishClassifyId,
        isFree: newV.needPayClassifyId,
        order: newV.ordersClassifyId,
      }).then((data) => {
        this.comicList = data.data;
        console.log("选择后漫画列表", this.comicList);
        this.finished = false;
      });
    },
  },
  //方法集合
  methods: {
    /* 返回方法 */
    goBack() {
      this.$router.go(-1);
    },
    /* 获取分类列表方法 */
    getAllLabelFun() {
      GetallLabel().then((data) => {
        this.allLabel = data.data;
        console.log("全部分类数据", this.allLabel);
      });
    },
    /* 选择该分类方法 */
    chooseThisClassify(item) {
      this.allClassifyId = item.id;
      console.log("当前style选择分类为", item.name, "id:", this.allClassifyId);
    },
    /* 选择全部分类中全部 */
    chooseAllClassifyall() {
      this.allClassifyId = -1;
      console.log("当前style选择分类为全部", "id:", this.allClassifyId);
    },
    /* 选择该地区分类 */
    chooseThisAreaClassify(item) {
      this.areaClassifyId = item.id;
      console.log("当前选择地区分类为", item.name, "id:", this.areaClassifyId);
    },
    /* 选择地区分类全部 */
    chooseAreaClassifyall() {
      this.areaClassifyId = -1;
      console.log("当前选择地区分类为全部", "id:", this.areaClassifyId);
    },
    /* 选择该完结分类 */
    chooseThisstatusClassify(item) {
      this.isFinishClassifyId = item.id;
      console.log(
        "当前选择完结分类为",
        item.name,
        "id:",
        this.isFinishClassifyId
      );
    },
    /* 选择完结分类全部 */
    chooseisFinishClassifyall() {
      this.isFinishClassifyId = -1;
      console.log("当前选择完结分类为全部", "id:", this.isFinishClassifyId);
    },
    /* 选择该付费分类 */
    chooseThisneedPayClassify(item) {
      this.needPayClassifyId = item.id;
      console.log(
        "当前选择完结分类为",
        item.name,
        "id:",
        this.needPayClassifyId
      );
    },
    /* 选择付费分类全部 */
    chooseneedPayClassifyall() {
      this.needPayClassifyId = -1;
      console.log("当前选择完结分类为全部", "id:", this.needPayClassifyId);
    },
    /* 选择该人气分类 */
    chooseThisOrdersClassify(item) {
      this.ordersClassifyId = item.id;
      console.log(
        "当前选择人气分类为",
        item.name,
        "id:",
        this.ordersClassifyId
      );
    },
    /* 获取漫画列表方法 */
    /* getClassPageFun() {
      console.log("加载漫画列表中...");
      GetClassPage({
        styleId: this.allClassifyId,
        areaId: this.areaClassifyId,
        isFinish: this.isFinishClassifyId,
        isFree: this.needPayClassifyId,
        order: this.ordersClassifyId,
        pageNum: this.pageNum,
      }).then((data) => {
        this.comicList = data.data;
        console.log("漫画列表", this.comicList);
      });
    }, */
    /* 跳转漫画详情页方法 */
    ToComicDetails(comicId) {
      this.$router.push({
        name: "comicdetails",
        query: {
          comicId: comicId,
        },
      });
    },
    /* 下拉加载方法 */
    onLoad() {
      // 异步更新数据
      console.log("触底了~");
      this.pageNum += 1;
      GetClassPage({
        styleId: this.allClassifyId,
        areaId: this.areaClassifyId,
        isFinish: this.isFinishClassifyId,
        isFree: this.needPayClassifyId,
        order: this.ordersClassifyId,
        pageNum: this.pageNum,
      }).then((data) => {
        if (data.data.length == 0) {
          this.finished = true;
          return;
        }
        this.comicList.push(...data.data);
        console.log("漫画列表", this.comicList, data.data);
        this.loading = false;
      });
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getAllLabelFun();
    /* this.getClassPageFun(); */
  },
  //生命周期 - 挂载完成(可以访问DOM元素)
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能,这个函数会触发
};
</script>
<style lang="scss" scoped>
.classifyView {
  width: 100vw;
  .van-nav-bar {
    /* margin: 0 auto;
    max-width: 750px;
    min-width: 375px; */
  }
  .classifyBox {
    margin: 0 auto;
    max-width: 750px;
    min-width: 375px;
    padding: 0 0.3733rem;
    box-sizing: border-box;
    .allClassify {
      height: 1.8667rem;
      margin-top: 1.3333rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      border-bottom: 0.0267rem solid rgb(238, 238, 238);
      padding-bottom: 0.32rem;
      .allClassifyItem {
        flex: none;
        margin-right: 0.2933rem;
        font-size: 0.32rem;
      }
      .active {
        color: rgb(110, 195, 255);
      }
    }
    .areaClassify {
      margin-top: 0.4rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .areaClassifyItem {
        flex: none;
        margin-right: 0.2933rem;
        font-size: 0.32rem;
      }
      .active {
        color: rgb(110, 195, 255);
      }
    }
    .isFinishClassify {
      margin-top: 0.4rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .isFinishClassifyItem {
        flex: none;
        margin-right: 0.2933rem;
        font-size: 0.32rem;
      }
      .active {
        color: rgb(110, 195, 255);
      }
    }
    .needPayClassify {
      margin-top: 0.4rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .needPayClassifyItem {
        flex: none;
        margin-right: 0.2933rem;
        font-size: 0.32rem;
      }
      .active {
        color: rgb(110, 195, 255);
      }
    }
    .ordersClassify {
      margin-top: 0.4rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .ordersClassifyItem {
        flex: none;
        margin-right: 0.2933rem;
        font-size: 0.32rem;
      }
      .active {
        color: rgb(110, 195, 255);
      }
    }
  }
  .comicList {
    margin: 0 auto;
    max-width: 750px;
    min-width: 375px;
    padding: 0 0.2933rem;
    box-sizing: border-box;
    .van-list {
      display: flex;
      /* justify-content: space-around; */
      flex-wrap: wrap;
      align-items: center;
      ::v-deep .van-list__finished-text {
        width: 100%;
      }
      ::v-deep .van-list__loading {
        width: 100%;
      }
      .comicItem {
        flex: 1;
        margin-top: 0.4rem;
        width: 2.96rem;
        text-align: left;
        .comicImg {
          img {
            width: 2.96rem;
            height: 3.9467rem;
            transition: all 0.8s;
          }
        }
        .comicName {
          font-size: 0.32rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0.1333rem 0;
        }
        .updataed {
          font-size: 0.32rem;
          color: rgb(173, 174, 181);
        }
      }
    }
  }
}

.bgChange-enter-active,
.bgChange-leave-active {
  transition: opacity 0.5s;
}
.bgChange-enter,
.bgChange-leave-to {
  opacity: 0;
}
</style>