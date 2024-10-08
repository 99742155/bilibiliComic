<!-- 搜索后页面 -->
<template>
  <div class="afterSearch">
    <!-- 搜索框 -->
    <form class="searchBox" action="/">
      <van-search
        shape="round"
        v-model="Searchvalue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索后视图 -->
    <div class="afterSearchView">
      <!-- 排序、全部分类、筛选 -->
      <div class="afterSearchClassify" v-show="showSearchView">
        <van-dropdown-menu active-color="#1989fa">
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
          <van-dropdown-item v-model="value3" :options="option3" />
        </van-dropdown-menu>
      </div>
      <!-- 搜索漫画列表 -->
      <van-loading type="spinner" v-if="!searchResult" />
      <div class="afterSearchComicList" v-if="searchResult">
        <!-- 漫画块儿 -->
        <van-list
          class="recommendComicList_in"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- 搜索后漫画小块儿 -->
          <div
            class="afterSearchComicListItem"
            v-for="(item, index) in searchResult"
            :key="index"
            @click="chooseThisComic(item.id)"
          >
            <div class="comicImg">
              <img :src="item.vertical_cover + '@60w.jpg'" alt="" />
            </div>
            <!-- 漫画详情 -->
            <div class="comicDetails">
              <!-- 漫画名 -->
              <div class="comicName" v-html="item.title"></div>
              <div class="comicInd">
                <!-- 作者 -->
                <div class="author">
                  <span
                    v-for="(author, index) in item.author_name"
                    :key="index"
                  >
                    <span v-html="author"></span>&nbsp;
                  </span>
                </div>
                <!-- 漫画类型 -->
                <div class="style">
                  <span v-for="(styles, index) in item.styles" :key="index">
                    <span v-html="styles"></span>&nbsp;
                  </span>
                </div>
                <!-- 是否完结 -->
                <div class="finish">
                  <span v-show="item.is_finish == 1">已完结</span>
                  <span v-show="item.is_finish == 0">连载中</span>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { getSearch } from "@/api/aftersearch";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      /* 搜索框词 */
      Searchvalue: null,
      /* 排序、全部分类、筛选 */
      value1: 0,
      value2: 0,
      value3: 0,
      option1: [
        { text: "默认排序", value: 0 },
        { text: "新款商品", value: 1 },
        { text: "活动商品", value: 2 },
      ],
      option2: [
        { text: "全部分类", value: 0 },
        { text: "好评排序", value: 1 },
        { text: "销量排序", value: 2 },
      ],
      option3: [
        { text: "筛选", value: 0 },
        { text: "好评排序", value: 1 },
        { text: "销量排序", value: 2 },
      ],
      /* 搜索词 */
      searchText: "",
      /* 显示搜索视图 */
      showSearchView: true,
      /* 搜索结果 */
      searchResult: [],
      /* 搜索页数 */
      pageNum: 1,
      /* 下拉加载中 */
      loading: false,
      /* 所有下拉加载完毕 */
      finished: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    Searchvalue: function () {},
  },
  //方法集合
  methods: {
    /* 搜索方法 */
    getSearchFun() {
      this.searchText = this.$route.query.aftersearch;
      this.Searchvalue = this.searchText;
      /* console.log("搜索词", this.searchText, this.Searchvalue); */
      getSearch({
        keyWord: this.searchText,
        pageNum: this.pageNum,
      }).then((data) => {
        this.searchResult = data.data.list;
        /* console.log("搜索后数据", this.searchResult); */
      });
    },
    /* 回车搜索方法 */
    onSearch() {},
    /* 取消方法 */
    onCancel() {
      this.$router.push({ name: "home" });
    },
    /* 下拉加载方法 */
    onLoad() {
      console.log("触底了");
      this.pageNum += 1;
      console.log("当前页数", this.pageNum);
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        getSearch({
          keyWord: this.searchText,
          pageNum: this.pageNum,
        }).then((data) => {
          if (data.data.list.length == 0) {
            this.finished = true;
            return;
          }
          console.log(
            "加载后获取的第" + this.pageNum + "页数据",
            data.data.list,
            "数组长度为",
            data.data.list.length
          );
          if (data.data.list.length != 0) {
            for (let i = 0; i < data.data.list.length - 1; i++) {
              this.searchResult.push(data.data.list[i]);
            }
          }
          console.log(
            "推入加载后数据",
            this.searchResult,
            "当前分页",
            this.pageNum
          );
          // 加载状态结束
          this.loading = false;
          console.log("加载完毕");
        });
        // 数据全部加载完成
      }, 1);
    },
    /* 选择这本漫画方法 */
    chooseThisComic(comicId) {
      this.$router.push({
        name: "comicdetails",
        query: {
          comicId: comicId,
        },
      });
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getSearchFun();
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
<style lang="scss">
.afterSearch {
  .searchBox {
    border-bottom: .0267rem solid rgb(242, 242, 242);
  }
  .afterSearchView {
    /* 分类 */
    .afterSearchClassify {
      .van-dropdown-menu {
        font-size: .32rem;
        .van-dropdown-menu__bar {
          height:1.1733rem;
          box-shadow: none;
          border-bottom: .0267rem solid rgb(242, 242, 242);
          .van-ellipsis {
            font-size: .32rem;
          }
        }
      }
    }
    /* 搜索漫画列表 */
    .afterSearchComicList {
      padding: 0 .32rem;
      .afterSearchComicListItem {
        text-align: left;
        margin: .32rem 0;
        height: 2.1333rem;
        display: flex;
        .comicImg {
          img {
            background-image: url(../assets/imgLoadings.gif);
            background-position: center 0;
            background-size: cover;
            border-radius: .1067rem;
            width: 1.6rem;
            height: 2.1333rem;
          }
        }
        .comicDetails {
          padding: .0533rem 0;
          box-sizing: border-box;
          margin-left: .4rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .comicName {
            font-size: .3733rem;
            .keyword {
              font-style: normal;
              color: rgb(51, 171, 255);
            }
          }
          .comicInd {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: .24rem;
            color: rgb(149, 151, 159);
            .author {
              display: flex;
            }
            .keyword {
              font-style: normal;
              color: rgb(51, 171, 255);
            }
          }
        }
      }
    }
  }
}
</style>