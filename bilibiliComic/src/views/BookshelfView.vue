<!-- 书架页 -->
<template>
  <div class="bookshelfView">
    <!-- 头部Tab标签 -->
    <van-tabs v-model="active" color="black" line-width=".2667rem" sticky>
      <!-- 追漫视图 -->
      <van-tab title="追漫">
        <div class="comicList">
          <!-- 漫画块儿 -->
          <van-list
            class="comicList_in"
            v-model="loading"
            :finished="finished"
            @load="onLoad"
            loading-text=" "
          >
            <div
              class="comicItem"
              v-for="(item, index) in FavComics"
              :key="index"
              @click="ToComicDetails(item.comic_id)"
            >
              <!-- 漫画图 -->
              <div class="comicImg">
                <img :src="item.vcover + '@660w.jpg'" alt="" />
              </div>
              <!-- 漫画名 -->
              <div class="comicName">{{ item.title }}</div>
              <!-- 漫画更新与观看 -->
              <!-- 加载中 -->
              <van-loading
                size=".4rem"
                type="spinner"
                v-show="comicDetail.length != FavComics.length"
              />
              <!-- 是否观看 -->
              <div
                class="watched"
                v-for="(updataed, index) in comicDetail"
                :key="index"
                v-show="comicDetail.length == FavComics.length"
              >
                <div class="watched_in" v-if="item.comic_id == updataed.id">
                  <span v-show="!updataed.last_read_time">未看</span>
                  <span v-show="updataed.last_read_time"
                    >看到{{ updataed.last_read_time }} </span
                  >/
                  <span>{{ updataed.last_short_title }}</span>
                  <span>话</span>
                </div>
              </div>
            </div>
            <div class="comicItem last" @click="tohome()">
              <div class="img">+</div>
            </div>
          </van-list>
        </div>
      </van-tab>
      <van-tab title="历史"
        ><div class="noDownLoadImg">
          <img
            src="@/assets/images/placeholder/light/comic_placeholder_userzone_empty.png"
            alt=""
          />
          <br />
          你还木有观看漫画哦(･ω･)ﾉ,找本喜欢的漫画看吧~
        </div></van-tab
      >
      <van-tab title="缓存">
        <div class="noDownLoadImg">
          <img
            src="@/assets/images/placeholder/light/comic_placeholder_userzone_empty.png"
            alt=""
          />
          <br />
          你还木有缓存漫画哦T_T
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { getFavComics } from "@/api/userinfo";
import { getComicDetail } from "@/api/comic";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      active: 0,
      FavComics: [],
      comicDetail: [],
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
  watch: {},
  //方法集合
  methods: {
    /* 获取用户书架（收藏）方法 */
    getFavComicsFun() {
      getFavComics({ uid: 86984521, pageNum: this.pageNum }).then((data) => {
        this.FavComics = data.data.fav_comics;
        console.log("用户书架（收藏）", this.FavComics);
        for (let i = 0; i < this.FavComics.length; i++) {
          getComicDetail({ comicId: data.data.fav_comics[i].comic_id }).then(
            (data) => {
              this.comicDetail.push(data.data);
            }
          );
        }
        console.log("漫画详情", this.comicDetail);
      });
    },
    /* 下拉加载 */
    onLoad() {
      this.pageNum += 1;
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        /* 获取书架漫画列表 */
        getFavComics({ uid: 86984521, pageNum: this.pageNum }).then((data) => {
          if (data.data.fav_comics.length == 0) {
            this.finished = true;
            console.log("加载完毕");
          }
          console.log(data, 123);
          for (let i = 0; i < data.data.fav_comics.length; i++) {
            this.FavComics.push(data.data.fav_comics[i]);
          }
          console.log(
            "下拉后用户书架（收藏）",
            this.FavComics,
            "当前页数",
            this.pageNum
          );
          for (let i = 0; i < data.data.fav_comics.length; i++) {
            console.log("漫画详情", data.data.fav_comics[i]);
            /* 获取漫画详情列表 */
            getComicDetail({ comicId: data.data.fav_comics[i].comic_id }).then(
              (data) => {
                this.comicDetail.push(data.data);
              }
            );
          }
          console.log("下拉后漫画详情", this.comicDetail);
          // 加载状态结束
          this.loading = false;
        });
      });

      // 数据全部加载完成
    },
    /* 跳转漫画详情页 */
    ToComicDetails(comicId) {
      this.$router.push({
        name: "comicdetails",
        query: {
          comicId: comicId,
        },
      });
    },

    /* 跳转推荐排行榜页方法 */
    tohome() {
      this.$router.push({
        name: "listrank",
      });
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getFavComicsFun();
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
<style  lang="scss" scoped>
.bookshelfView {
  font-family: "mine";
  width: 100vw;
  .van-tabs {
    min-width: 375px;
    max-width: 750px;
    margin: 0 auto;
    box-sizing: border-box;
    ::v-deep .van-tabs__wrap {
      padding: 0 3.3333rem;
      border-bottom: 0.0267rem solid rgb(246, 246, 246);
      margin-bottom: 0.3733rem;
      background-color: white;
    }
    .comicList {
      .comicList_in {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        /* justify-content: space-around; */
        align-items: center;
        margin-bottom: 1.3333rem;
        .comicItem {
          width: 2.9333rem;
          height: 4.88rem;
          margin: 0 0.1867rem;
          margin-bottom: 0.3733rem;
          .comicImg {
            width: 2.9333rem;
            height: 3.9467rem;
            background-image: url(../assets/imgLoadings.gif);
            background-position: center 0;
            background-size: cover;
            margin-bottom: 0.16rem;
            img {
              width: 2.9333rem;
              height: 3.9467rem;
              border-radius: 0.08rem;
            }
          }
          .comicName {
            font-size: 0.2667rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
          }
          .watched {
            text-align: left;
            font-size: 0.2667rem;
            color: rgb(185, 187, 193);
          }
          &.last {
            .img {
              width: 2.9333rem;
              height: 3.9467rem;
              line-height: 3.9467rem;
              border-radius: 0.08rem;
              font-size: 0.8rem;
              color: rgb(50, 170, 255);
              border: 0.0267rem solid rgb(224, 242, 255);
              background-color: rgb(247, 252, 255);
            }
          }
        }
      }
    }
    .noDownLoadImg {
      margin-top: 25vh;
      color: rgb(163, 165, 174);
      font-size: 0.3733rem;
      img {
        width: 4.9333rem;
        margin-bottom: 0.4rem;
      }
    }
  }
}
</style>