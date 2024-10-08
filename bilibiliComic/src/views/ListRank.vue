<!-- 排行榜 -->
<template>
  <div class="listRank" v-if="listRank">
    <div class="listRank_in">
      <!-- 排行榜顶部导航 -->
      <div class="tab">
        <div class="goback" @click="goBack">
          <svg
            width=".64rem"
            height=".64rem"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
            <desc>Created with Sketch.</desc>
            <g
              id="1.-原子/图标-Icon/顶部导航栏/返回"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <path
                d="M10.6916913,18.2928932 C11.1027696,18.6834175 11.1027696,19.3165825 10.6916913,19.7071068 C10.2806131,20.0976311 9.6141237,20.0976311 9.20304549,19.7071068 L1.30830865,12.2071068 C0.89723045,11.8165825 0.89723045,11.1834175 1.30830865,10.7928932 L9.20304549,3.29289322 C9.6141237,2.90236893 10.2806131,2.90236893 10.6916913,3.29289322 C11.1027696,3.68341751 11.1027696,4.31658249 10.6916913,4.70710678 L3.54127743,11.5 L10.6916913,18.2928932 Z"
                id="返回"
                fill="#6C6F7E"
                fill-rule="nonzero"
              ></path>
            </g>
          </svg>
        </div>
        <div class="title">排行</div>
        <div class="noUse"></div>
      </div>
      <!-- 左部导航栏 -->
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="(item, index) in listRank"
          :key="index"
          :title="item.name"
        />
      </van-sidebar>
      <!-- 右部盒子 -->
      <div class="rightBox">
        <!-- 顶部介绍 -->
        <div
          class="top"
          v-for="(item, index) in listRank"
          :key="item.id"
          :title="item.name"
          v-show="index == activeKey"
        >
          {{ item.description }}
        </div>
        <!-- 加载中 -->
        <van-loading
          type="spinner"
          style="margin-top: 30vh"
          v-if="listInfo.length != listRank.length"
        />
        <!-- 右部内容 -->
        <div class="listRankBox" v-if="listInfo.length == listRank.length">
          <!-- 右部内容盒子 -->
          <div
            class="listRankItem"
            v-for="(item, index) in listInfo[activeKey].list"
            :key="index"
            @click="chooseThisComic(item.comic_id)"
          >
            <!-- 排彳亍 -->
            <div
              class="leftNum"
              :style="{ fontSize: index < 3 ? '1.6rem' : '.6667rem' }"
            >
              {{ (index + 1) | NumFuilter }}
            </div>
            <div class="comicImg">
              <img :src="item.vertical_cover + '@100w.jpg'" alt="" />
            </div>
            <div class="rightInfo">
              <div class="comicName">{{ item.title }}</div>
              <div class="comicAuthor">
                <span v-for="(author, index) in item.author" :key="index">{{
                  author
                }}</span>
                &nbsp;
              </div>
              <div class="comicStyle" v-if="item.styles.length != 0">
                {{ item.styles[0].name }}
              </div>
              <div class="comicUpdated">
                更新至{{ item.last_short_title }}话
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { getListRank, getRankInfo } from "@/api/rank";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      activeKey: 0,
      listRank: "",
      listInfo: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* 返回方法 */
    goBack() {
      this.$router.go(-1);
    },
    /* 获取排行榜方法 */
    async getListRankFun() {
      let data = await getListRank();
      this.listRank = data.data.list;
      console.log("排行榜:", this.listRank);
      for (let i = 0; i < this.listRank.length; i++) {
        await getRankInfo({ id: this.listRank[i].id }).then((info) => {
          this.listInfo.push(info.data);
        });
      }
      console.log(this.listInfo);
    },

    /* 选择该漫画方法 */
    chooseThisComic(comicId) {
      this.$router.push({
        name: "comicdetails",
        query: {
          comicId: comicId,
        },
      });
    },
  },
  filters: {
    /* 排行数字过滤器 */
    NumFuilter(index) {
      let newIndex = "";
      if (index > 3 && index < 10) {
        newIndex = "0" + index;
        return newIndex;
      } else {
        return index;
      }
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getListRankFun();
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
.listRank {
  width: 100vw;
  .listRank_in {
    margin: 0 auto;
    max-width: 750px;
    min-width: 375px;
    .tab {
      max-width: 750px;
      min-width: 375px;
      z-index: 2;
      background-color: white;
      width: 100%;
      position: fixed;
      top: 0;
      padding: 0.3733rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.0267rem solid rgb(238, 238, 238);
      .goback {
        svg {
          display: block;
        }
      }
    }
    .van-sidebar {
      position: fixed;
    }
    .rightBox {
      margin-top: 1.3333rem;
      margin-left: 2.1333rem;
      box-sizing: border-box;
      .top {
        padding: 0.3733rem 0;
        font-size: 0.2667rem;
        color: rgb(192, 193, 198);
      }
      .listRankBox {
        .listRankItem {
          position: relative;
          display: flex;
          margin-bottom: 0.3733rem;
          .leftNum {
            position: absolute;
            left: 0;
            font-weight: bolder;
            color: rgb(207, 152, 112);
          }
          .comicImg {
            margin-left: 0.72rem;
            z-index: 1;
            img {
              width: 2.1333rem;
            }
          }
          .rightInfo {
            margin-left: 0.2133rem;
            text-align: left;
            .comicName {
              font-size: 0.4rem;
              -webkit-line-clamp: 1;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 0.5867rem;
            }
            .comicAuthor {
              font-size: 0.32rem;
              margin-bottom: 0.2667rem;
              color: rgb(163, 165, 173);
            }
            .comicStyle {
              font-size: 0.32rem;
              margin-bottom: 0.2667rem;
              color: rgb(163, 165, 173);
            }
            .comicUpdated {
              font-size: 0.32rem;
              color: rgb(163, 165, 173);
            }
          }
        }
      }
    }
  }
}
</style>