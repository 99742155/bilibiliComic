<!--  -->
<template>
  <div class="home">
    <div class="homeIn">
      <!-- 顶部导航 -->
      <!-- <van-loading type="spinner" v-if="!banner"/> -->
      <div v-if="!banner" class="loading">
        <img src="../assets/loading.gif" alt="" />
      </div>
      <div class="top" v-if="banner">
        <div class="topBackground">
          <!-- 顶部搜索框 -->
          <transition mode="out-in">
            <div class="topsearch">
              <div class="searchBox" @click="toSearch">
                <svg
                  t="1658471417037"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2233"
                  width="11"
                  height="11"
                >
                  <path
                    d="M966.4 924.8l-230.4-227.2c60.8-67.2 96-156.8 96-256 0-217.6-176-390.4-390.4-390.4-217.6 0-390.4 176-390.4 390.4 0 217.6 176 390.4 390.4 390.4 99.2 0 188.8-35.2 256-96l230.4 227.2c9.6 9.6 28.8 9.6 38.4 0C979.2 950.4 979.2 934.4 966.4 924.8zM102.4 441.6c0-185.6 150.4-339.2 339.2-339.2s339.2 150.4 339.2 339.2c0 89.6-35.2 172.8-92.8 233.6-3.2 0-3.2 3.2-6.4 3.2-3.2 3.2-3.2 3.2-3.2 6.4-60.8 57.6-144 92.8-233.6 92.8C256 780.8 102.4 627.2 102.4 441.6z"
                    p-id="2234"
                    fill="rgb(243,244,245)"
                  ></path>
                </svg>
                <van-swipe
                  :show-indicators="false"
                  :autoplay="3000"
                  vertical
                  style="height: 0.5867rem"
                >
                  <van-swipe-item
                    v-for="(item, index) in bannerText"
                    :key="index"
                    >{{ item.title }}</van-swipe-item
                  >
                </van-swipe>
              </div>
              <div class="classift" @click="toClassifyview">分类</div>
            </div>
          </transition>
          <!-- 分类 -->
          <div class="classify" v-if="classPageAllTabs.data">
            <!-- 分类栏 -->
            <!-- <van-sticky @change="touchTop()">
              <van-tabs
                v-model="active"
                :background="flag ? 'white' : 'transparent'"
                :title-inactive-color="flag ? 'rgb(122,124,138)' : '#DCDCDC'"
                :title-active-color="flag ? 'black' : '#ffffff'"
                line-width="0"
              >
                <van-tab
                  v-for="(item, index) in classPageAllTabs.data.home_type"
                  :key="index"
                  :title="item.name"
                  @click="getTabDetailFun()"
                ></van-tab>
              </van-tabs>
            </van-sticky> -->
            <!-- 推荐视图 -->
            <div class="recommend" v-show="active == 1">
              <!-- 背景颜色 -->
              <transition name="bgChange">
                <div
                  class="backgrounds"
                  :style="{ 'background-color': topBackgroundColor }"
                >
                  <div class="backgroundsImg"></div>
                </div>
              </transition>
              <!-- 轮播图 -->
              <div class="recommendBanner">
                <swiperdemo></swiperdemo>
              </div>
              <!-- 推荐分类 -->
              <div class="recommendClassify">
                <div class="charts all" @click="chooseListRank">
                  <div class="img">
                    <img src="../assets/recommendClassify/排行.png" />
                  </div>
                  排行
                </div>
                <div class="club all" @click="unFinish()">
                  <div class="img">
                    <img src="../assets/recommendClassify/社.png" />
                  </div>
                  绘星社
                </div>
                <div class="activityCenter all" @click="unFinish()">
                  <div class="img">
                    <img src="../assets/recommendClassify/活动中心.png" />
                  </div>
                  活动中心
                </div>
                <div class="free all" @click="unFinish()">
                  <div class="img">
                    <img src="../assets/recommendClassify/免费.png" />
                  </div>
                  免费
                </div>
              </div>
              <!-- 推荐漫画列表 -->
              <van-loading type="spinner" v-if="!recommendComicList" />
              <div class="recommendComicList" v-if="recommendComicList">
                <van-list
                  class="recommendComicList_in"
                  v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad"
                >
                  <!-- 漫画块儿 -->
                  <div
                    class="comicItem"
                    v-for="(item, index) in recommendComicList"
                    :key="index"
                    v-show="item.image && item.comic_info.decision"
                    @click="chooseThisComic(item.item_id)"
                  >
                    <!-- 漫画图 -->
                    <div class="comicImg" v-if="item.image">
                      <img :src="item.image + '@660w.jpg'" alt="" />
                    </div>
                    <!-- 漫画介绍 -->
                    <div class="comicText">
                      <div class="comicName">{{ item.title }}</div>
                      <div class="comicCondition">
                        <!-- 左高分介绍 -->
                        <div
                          class="comicCondition_left_decision"
                          v-if="item.comic_info.decision"
                        >
                          {{ item.comic_info.decision }}
                        </div>
                        <!-- 左分类介绍 -->
                        <div
                          class="comicCondition_left_main_style_name"
                          v-if="!item.comic_info.decision"
                        >
                          {{ item.comic_info.main_style_name }}
                        </div>
                        <!-- 右更多 -->
                        <div class="comicCondition_right">
                          <van-cell @click="show = true" style="padding: 0">
                            <img
                              src="../assets/images/comment/ic_more_gray_v2.png"
                              alt=""
                            />
                          </van-cell>
                          <van-action-sheet
                            v-model="show"
                            :actions="actions"
                            cancel-text="取消"
                            close-on-click-action
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </van-list>
              </div>
            </div>
            <!--热门视图 -->
            <div class="hot" v-show="active == 0">热门视图</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import swiperdemo from "../components/swiper/swiperCom.vue";
import {
  getBanner,
  getClassPageAllTabs,
  getHomeRecommend,
  getClassPageSixComics,
  getHomeFeed,
  getClassPageLayout,
  getClassPageHomeBanner,
} from "../api/home";
import { getComicDetail } from "@/api/comic";
import { Toast } from 'vant';
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { swiperdemo },
  data() {
    //这里存放数据
    return {
      active: 1,
      banner: null,
      bannerLength: "",
      topBackgroundColor: null,
      classPageAllTabs: "",
      bannerText: null,
      bannerIndex: 0,
      recommendComicList: "",
      pageNums: 1,
      loading: false,
      finished: false,
      flag: false,
      show: false,
      actions: [{ name: "选项一" }, { name: "选项二" }],
      tabId: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    bannerIndex: function () {
      console.log(this.bannerIndex);
    },
    active: function () {
      /* console.log(this.active); */
      console.log(
        "当前id",
        this.classPageAllTabs.data.home_type[this.active].id
      );
      /* 获取模块方法 */
      getClassPageLayout({
        tabId: this.classPageAllTabs.data.home_type[this.active].id,
      }).then((data) => {
        console.log("模块化数据", data);
        console.log("轮播图id", data.data.layout[0].id);
        getClassPageHomeBanner({ id: data.data.layout[0].id }).then((data) => {
          console.log("模块化轮播图数据", data.data);
        });
      });
    },
  },
  //方法集合
  methods: {
    /* 获取轮播图方法 */
    getBannerFun() {
      getBanner().then((data) => {
        this.banner = data.data;
        console.log(this.banner);
        this.bannerLength = this.banner.length;
      });
    },
    /* 获取所有分类方法 */
    getClassPageAllTabsFun() {
      getClassPageAllTabs({
        code: 0,
        data: { tab_type: [0, 6, 9, 12] },
      }).then((data) => {
        this.classPageAllTabs = data;
        console.log("分类列表", this.classPageAllTabs);
        this.getClassPageSixComicsFun();
      });
    },
    /* 获取主页推荐方法 */
    getHomeRecommendFun() {
      getHomeRecommend().then((data) => {
        this.bannerText = data.data.list;
        console.log(this.bannerText);
      });
    },
    /* 获取分类方法 */
    getTabDetailFun() {
      console.log("asdasdasd");
    },
    /* 获取漫画列表方法 */
    getClassPageSixComicsFun() {
      getClassPageSixComics({
        id: this.classPageAllTabs.data.home_type[this.active].id,
        pageSize: 8,
        pageNum: this.pageNums,
        isAll: 0,
      }).then((data) => {
        data;
        /* this.recommendComicList = data.data.roll_six_comics; */
        /* console.log("漫画列表", data, "当前分页", this.pageNums); */
      });
    },
    /* 获取首页homefeed方法 */
    getHomeFeedFun() {
      getHomeFeed({
        pageNum: this.pageNums,
      }).then((data) => {
        this.recommendComicList = data.data.feeds;
        console.log(
          "homeFeed漫画列表",
          this.recommendComicList,
          "当前分页",
          this.pageNums
        );
      });
    },
    /* 下拉刷新加载 */
    onLoad() {
      console.log("触底了");
      this.pageNums += 1;
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        getHomeFeed({
          pageNum: this.pageNums,
        }).then((data) => {
          console.log("加载中");
          for (let i = 0; i < data.data.feeds.length - 1; i++) {
            this.recommendComicList.push(data.data.feeds[i]);
          }
          console.log(
            "加载后漫画列表",
            this.recommendComicList,
            "当前分页",
            this.pageNums
          );
          this.loading = false;
          console.log("加载完毕");
        });
        // 加载状态结束

        // 数据全部加载完成
      }, 2);
    },
    /* 触顶方法 */
    touchTop() {
      this.flag = !this.flag;
    },
    /* 选择该漫画方法 */
    async chooseThisComic(id) {
      let index = "";
      let ep_list = "";
      console.log("当前选择漫画Id为", id);
      await getComicDetail({ comicId: id }).then((data) => {
        index = 0;
        ep_list = data.data.ep_list.reverse();
        console.log(index, ep_list);
      });
      this.$router.push({
        name: "comicview",
        query: { index: index, ep_list: ep_list, comicId: id },
      });
    },
    /* 跳转搜索页 */
    toSearch() {
      this.$router.push({ name: "search" });
    },
    /* 跳转分类页 */
    toClassifyview() {
      this.$router.push({ name: "classifyview" });
    },
    /* 跳转排行榜 */
    chooseListRank() {
      this.$router.push({ name: "listrank" });
    },
    unFinish(){
      Toast("该功能维护中，尝试下其他的吧~")
    }
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getBannerFun();
    this.getClassPageAllTabsFun();
    this.getHomeRecommendFun();
    this.getHomeFeedFun();
  },
  //生命周期 - 挂载完成(可以访问DOM元素)
  mounted() {
    this.$bus.$on("topBackgroundColor", (data) => {
      this.topBackgroundColor = data;
    });
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    this.$bus.$off("topBackgroundColor");
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能,这个函数会触发
};
</script>
<style lang="scss" scoped>
.home {
  width: 100vw;
  .homeIn {
    max-width: 750px;
    min-width: 375px;
    margin: 0 auto;
    font-family: "mine";
    position: relative;
    .loading {
      height: 100vh;
      overflow: hidden;
      background-color: rgb(237, 237, 237);
      img {
        right: 0;
        position: absolute;
        width: 90%;
        height: 100vh;
      }
    }
    .top {
      width: 100%;
      height: 100%;
      position: absolute;
      /*     background-color: #4169e1;
 */
      .topBackground {
        //background-image: url(../assets/images/home/light/noob_break_ice_banner_bg.png);
        /* 顶部搜索 */
        .topsearch {
          width: 100%;
          padding: 0.2667rem 0.2667rem 0 0.2667rem;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          /* 左部搜索 */
          .searchBox {
            svg {
              margin: 0 0.1333rem;
            }
            width: 7.8667rem;
            height: 0.5867rem;
            line-height: 0.5867rem;
            display: flex;
            align-items: center;
            text-align: left;
            font-size: 0.2667rem;
            color: rgb(243, 244, 245);
            border-radius: 0.2667rem;
            background-color: rgba($color: #000000, $alpha: 0.2);
          }
          /* 右分类 */
          .classift {
            width: 1.4667rem;
            height: 0.5867rem;
            line-height: 0.5867rem;
            font-size: 0.2667rem;
            color: rgb(243, 244, 245);
            border-radius: 0.2667rem;
            background-color: rgba($color: #000000, $alpha: 0.2);
          }
        }
        /* 分类 */
        .classify {
          margin: 0.1333rem 0;
          background-color: transparent;
          /* 推荐视图 */
          .recommend {
            height: 2.6667rem;
            position: relative;
            width: 100%;
            /* 变换背景颜色 */
            .backgrounds {
              width: 100%;
              height: 6.72rem;
              top: -2.1867rem;
              position: absolute;
              z-index: -1;
              transition: all 0.8s;
              .backgroundsImg {
                background-image: url(../assets/images/home/home_combine_bg_dark.png);
                width: 100%;
                height: 8.88rem;
                top: -2.16rem;
                position: absolute;
                z-index: -1;
                opacity: 0.6;
              }
            }
            /* 推荐视图轮播图 */
            .recommendBanner {
              width: 100%;
            }
            /* 推荐视图分类 */
            .recommendClassify {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 0.2667rem;
              padding: 0.2667rem 0.48rem 0rem 0.48rem;
              box-sizing: border-box;
              .all {
                .img {
                  img {
                    width: 0.5067rem;
                    height: 0.5067rem;
                  }
                  margin: 0.1067rem 0.1333rem 0.1067rem 0;
                }
                display: flex;
                line-height: 0.8rem;
              }
            }
            /* 推荐视图漫画列表 */
            .recommendComicList {
              padding: 0 0.2667rem;
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              padding-bottom: 1.3333rem;
              .recommendComicList_in {
                width: 100%;
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex: 1;
                flex-wrap: wrap;
                .comicItem {
                  width: 4.6667rem;
                  height: 7.8667rem;
                  margin: 0 0.0267rem;
                  border-radius: 0.1333rem;
                  overflow: hidden;
                  border: 0.0267rem solid rgb(246, 246, 246);
                  box-sizing: border-box;
                  margin-bottom: 0.2667rem;
                  .comicImg {
                    width: 4.6667rem;
                    height: 6.1867rem;
                    /* background-color: pink; */
                    background-image: url(../assets/imgLoadings.gif);
                    background-position: center 0;
                    background-size: cover;
                    img {
                      width: 4.6667rem;
                      height: 6.1867rem;
                    }
                  }
                  .comicText {
                    margin: 0 0.2133rem;
                    text-align: left;
                    .comicName {
                      overflow: hidden;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      font-size: 0.32rem;
                      margin: 0.2133rem 0;
                    }
                    .comicCondition {
                      display: flex;
                      justify-content: space-between;
                      .comicCondition_left_decision {
                        font-size: 0.2667rem;
                        color: rgb(255, 157, 18);
                        background-color: rgb(255, 250, 242);
                      }
                      .comicCondition_left_main_style_name {
                        display: flex;
                        justify-content: space-between;
                        font-size: 0.2667rem;
                        color: rgb(177, 178, 185);
                      }
                      img {
                        width: 0.2667rem;
                        height: 0.4267rem;
                      }
                    }
                  }
                }
              }
            }
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
}
</style>
