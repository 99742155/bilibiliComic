<!-- 点评页 -->
<template>
  <div class="commentView">
    <div class="top">
      <van-nav-bar
        :title="comicName"
        left-arrow
        @click-left="goback"
      />
      <div class="comicStar">
        <div class="comicValue">{{ comicStar | scrollValuefilter }}</div>
        <div class="starValue">
          <div class="starValueText" v-if="comicStar">综合评分</div>
          <van-rate
            v-model="scrollValue"
            readonly
            allow-half
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
            size="13px"
          />
        </div>
      </div>
    </div>
    <div class="commentBody">
      <van-tabs
        v-model="active"
        sticky
        line-width="10px"
        color="black"
        >
        <!-- offset-top="46px" -->
        <!-- 短评视图 -->
        <van-tab title="短评">
          <div class="loading" v-if="!listReviews">
            <div class="img">
              <img
                src="http://s1.hdslb.com/bfs/manga-static/manga-mobile/static/img/670007b907d30e5.png"
                alt=""
              />
            </div>
          </div>
          <div
            class="commentItem"
            v-for="(item, index) in listReviews"
            :key="index"
          >
            <div class="img">
              <img :src="item.face" alt="" />
            </div>
            <div class="commentText">
              <div class="userName">
                <span>{{ item.nick_name }}</span>
                <span>
                  <img
                    v-if="item.level != 0"
                    :src="
                      require('@/assets/images/club/club_v' +
                        item.level +
                        '.png')
                    "
                    alt=""
                  />
                </span>
              </div>
              <div class="userStar">
                <span
                  ><van-rate
                    v-model="item.score"
                    readonly
                    allow-half
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                    size="13px"
                /></span>
                <span>{{ item.umtime }}</span>
              </div>
              <div class="commentContent">{{ item.content }}</div>
              <div class="like" @click="like(item.like_count)">
                <svg
                  height="12"
                  viewBox="0 0 22 20"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6.125 17.743635h1.35v-10.57500002h-1.35zm7.575-12.00000002h5.625c.675 0 1.35.3 1.8.9.375.525.45 1.275.3 1.875l-2.4 7.95000002c-.375 1.5-1.65 2.55-3.225 2.625h-12.6c-.975.075-1.875-.45-2.325-1.275-.225-.45-.375-.9-.375-1.35v-8.02500002c0-.975.525-1.875 1.35-2.325.45-.225.9-.3 1.35-.375h3.375l3.675-4.575c.75-.825 2.1-.9 2.925-.15.45.45.75 1.05.675 1.725zm5.475 1.35h-6.975l.15-1.575.225-2.775c.075-.375-.15-.75-.525-.825-.225-.075-.525 0-.675.225l-3.45 4.425-.45.6h-4.5c-.15 0-.3.075-.45.15-.45.225-.675.675-.675 1.125v8.02500002c0 .225.075.525.225.675.225.45.675.675 1.125.6h12.6c.3 0 .525-.075.75-.225.6-.3 1.05-.825 1.125-1.5l2.4-7.87500002 1.35.3-1.35-.3c.075-.225 0-.525-.075-.75-.225-.15-.525-.3-.825-.3l.15-1.35z"
                    fill="#6c6f7e"
                  />
                </svg>
                {{ item.like_count | likeFilter }}
              </div>
            </div>
          </div>
        </van-tab>
        <!-- 长评视图 -->
        <van-tab title="长评">
          <div class="loading" v-if="!longlistReviews">
            <div class="img">
              <img
                src="http://s1.hdslb.com/bfs/manga-static/manga-mobile/static/img/670007b907d30e5.png"
                alt=""
              />
            </div>
          </div>
          <div
            class="commentItem"
            v-for="(item, index) in longlistReviews"
            :key="index"
          >
            <div class="img">
              <img :src="item.face" alt="" />
            </div>
            <div class="commentText">
              <div class="userName">
                <span>{{ item.nick_name }}</span>
                <span>
                  <img
                    v-if="item.level != 0"
                    :src="
                      require('@/assets/images/club/club_v' +
                        item.level +
                        '.png')
                    "
                    alt=""
                  />
                </span>
              </div>
              <div class="userStar">
                <span
                  ><van-rate
                    v-model="item.score"
                    readonly
                    allow-half
                    color="#ffd21e"
                    void-icon="star"
                    void-color="#eee"
                    size="13px"
                /></span>
                <span>{{ item.umtime }}</span>
              </div>
              <div class="commentContent">{{ item.content }}</div>
              <div class="like">
                <svg
                  height="12"
                  viewBox="0 0 22 20"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6.125 17.743635h1.35v-10.57500002h-1.35zm7.575-12.00000002h5.625c.675 0 1.35.3 1.8.9.375.525.45 1.275.3 1.875l-2.4 7.95000002c-.375 1.5-1.65 2.55-3.225 2.625h-12.6c-.975.075-1.875-.45-2.325-1.275-.225-.45-.375-.9-.375-1.35v-8.02500002c0-.975.525-1.875 1.35-2.325.45-.225.9-.3 1.35-.375h3.375l3.675-4.575c.75-.825 2.1-.9 2.925-.15.45.45.75 1.05.675 1.725zm5.475 1.35h-6.975l.15-1.575.225-2.775c.075-.375-.15-.75-.525-.825-.225-.075-.525 0-.675.225l-3.45 4.425-.45.6h-4.5c-.15 0-.3.075-.45.15-.45.225-.675.675-.675 1.125v8.02500002c0 .225.075.525.225.675.225.45.675.675 1.125.6h12.6c.3 0 .525-.075.75-.225.6-.3 1.05-.825 1.125-1.5l2.4-7.87500002 1.35.3-1.35-.3c.075-.225 0-.525-.075-.75-.225-.15-.525-.3-.825-.3l.15-1.35z"
                    fill="#6c6f7e"
                  />
                </svg>
                {{ item.like_count | likeFilter }}
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { getListReviews } from "@/api/comic";
import { Toast } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      active: 0,
      comicName: "",
      comicStar: "",
      listReviews: "",
      longlistReviews: "",
      pageNum: 1,
      scrollValue: 5,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* 返回详情方法 */
    goback() {
      this.$router.go(-1);
    },
    /* 获取短漫画点评列表 */
    getListReviewsFun() {
      let comicId = this.$route.query.comicId;
      this.comicName = this.$route.query.comicName;
      this.comicStar = this.$route.query.comicStar;
      this.scrollValue = this.comicStar / 2;
      getListReviews({
        comicId: comicId,
        pageNum: this.pageNum,
        type: 0,
      }).then((data) => {
        this.listReviews = data.data.reviews;
        console.log(this.listReviews);
      });
    },
    /* 获取长漫画点评列表 */
    getLongListReviewsFun() {
      let comicId = this.$route.query.comicId;
      this.comicName = this.$route.query.comicName;
      this.comicStar = this.$route.query.comicStar;
      this.scrollValue = this.comicStar / 2;
      getListReviews({
        comicId: comicId,
        pageNum: this.pageNum,
        type: 1,
      }).then((data) => {
        this.longlistReviews = data.data.reviews;
        console.log(this.longlistReviews);
      });
    },
    /* 喜欢方法 */
    like(num) {
      let liked = {
        code: 200,
        liked: 1,
        afterLikeNum: (num += 1),
        likeTime: new Date().toLocaleString(),
      };
      Toast("点赞成功~");
      console.log(liked);
    },
  },
  filters: {
    /* 星级评分过滤器 */
    scrollValuefilter(scrollValuefilter) {
      let afterscrollValuefilter = "";
      afterscrollValuefilter = scrollValuefilter.toFixed(1);
      return afterscrollValuefilter;
    },
    /* 用户评分星级过滤器 */
    starScrollfilter(value) {
      let newScroll = "";
      newScroll = (value / 2).toFixed(1);
      return newScroll;
    },
    /* 点赞过滤器 */
    likeFilter(value) {
      if (value < 10000) {
        return value;
      }
      let w = value > 10000 ? value / 10000 : value;
      let y = w > 10000 ? w.toFixed(1) + "亿" : w.toFixed(1) + "w";
      return y;
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getListReviewsFun();
    this.getLongListReviewsFun();
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
.commentView {
  width: 100vw;
  .top {
    min-width: 375px;
    max-width: 750px;
    margin: 0 auto;
    height: 3.0667rem;
    background-color: rgb(65, 52, 76);
    .van-nav-bar {
      background-color: rgb(65, 52, 76);
      ::v-deep .van-nav-bar__title {
        color: white;
      }
    }
    ::after {
      border: none;
    }
    .comicStar {
      padding: 0.3733rem;
      display: flex;
      padding-top: 0.5rem;
      .comicValue {
        font-size: 0.9333rem;
        color: #fff;
      }
      .starValue {
        margin-left: 0.32rem;
        .starValueText {
          text-align: left;
          font-size: 0.32rem;
          color: rgb(172, 168, 179);
        }
      }
    }
  }
  .commentBody {
    min-width: 375px;
    max-width: 750px;
    margin: 0 auto;
    .van-tabs {
      ::v-deep .van-tabs__wrap {
        background-color: white;
        ::v-deep .van-tabs__nav {
          width: 2.6667rem;
          ::v-deep .van-sticky {
            /* padding-bottom: .1333rem; */
            border: 0.0267rem solid rgb(244, 244, 244);
            ::v-deep .van-tab {
              width: 4rem;
              font-size: 0.32rem;
              flex: 0;
              span {
                width: 1.7333rem;
              }
            }
          }
        }
      }
      .loading {
        .img {
          margin-top: 3.4667rem;
          img {
            width: 5.4667rem;
          }
        }
      }
      .commentItem {
        margin-top: 0.4rem;
        display: flex;
        padding-bottom: 0.4rem;
        border-bottom: 0.0267rem solid rgb(242, 242, 242);
        .img {
          margin: 0 0.4rem;
          img {
            width: 0.6667rem;
            height: 0.6667rem;
            border-radius: 50%;
          }
        }
        .commentText {
          text-align: left;
          .userName {
            display: flex;
            align-items: center;
            font-size: 0.32rem;
            color: rgb(160, 162, 172);
            img {
              margin-left: 0.16rem;
              display: block;
              height: 0.4rem;
            }
          }
          .userStar {
            margin-bottom: 0.08rem;
            span {
              font-size: 0.32rem;
              color: rgb(160, 162, 172);
            }
          }
          .commentContent {
            width: 8.5333rem;
            margin-bottom: 0.08rem;
            //padding-right: 0.1333rem;
            font-size: 0.32rem;
            color: rgb(160, 162, 172);
            table-layout: fixed;
            word-wrap: break-all;
            word-break: normal;
            overflow: hidden;
          }
          .like {
            font-size: 0.32rem;
            color: rgb(160, 162, 172);
          }
        }
      }
    }
  }
}
</style>