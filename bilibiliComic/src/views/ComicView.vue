<!-- 漫画页 -->
<template>
  <div class="comic" v-if="theLastPath">
    <div class="comicImg">
      <!-- 上层遮罩层 -->
      <van-popup
        v-model="show"
        position="top"
        :style="{ height: '8%' }"
        overlay-class="overlay"
        v-if="ep_list"
      >
        <div class="left">
          <div class="gobackButton" @click="goback">
            <img
              src="@/assets/images/reader/2.0x/reader_bookmark_back.png"
              alt=""
            />
          </div>
          {{ this.ep_list[this.epIdIndex].short_title }}话 &nbsp;{{
            this.ep_list[this.epIdIndex].title
          }}
        </div>
        <div class="right">
          <div class="watchDetail" @click="goToDetail">查看详情</div>
          <div class="rightIcon">
            <div class="bookmark">
              <img
                src="@/assets/images/reader/2.0x/reader_book_mark.png"
                alt=""
              />
            </div>
            <div class="share">
              <img src="@/assets/images/reader/2.0x/reader_share.png" alt="" />
            </div>
          </div>
        </div>
      </van-popup>
      <!-- 漫画层 -->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" @load="onLoad">
          <!-- 漫画主体 -->
          <div
            class="comicImgItem"
            v-for="(item, index) in theLastPath"
            :key="index"
            @click="showPopup"
          >
            <img :src="item" alt="" />
          </div>
          <!-- 需要付费 -->
          <div class="needPay" v-show="finished" @click="showPopup">
            <div class="imgPlaceholder">
              <img
                src="@/assets/images/placeholder/light/comic_placeholder_userzone_empty.png"
                alt=""
              />该章节需要付费，莫得看啦~
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { getImageIndex, imageToken } from "@/api/comic";
import { Toast } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      epId: "",
      comicImages: "",
      host: "https://manga.hdslb.com",
      newPath: "",
      theLastPath: [],
      loading: false,
      finished: false,
      epIdIndex: null,
      ep_list: "",
      show: true,
      refreshing: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* 获取漫画章节图片下标方法 */
    async getImageIndexFun() {},
    /* 下拉加载 */
    async onLoad() {
      console.log("加载下一章");
      /* 判断是否有漫画章节下标 */
      if (this.epIdIndex == null) {
        this.epIdIndex = this.$route.query.index;
        this.ep_list = this.$route.query.ep_list;
      } else {
        this.epIdIndex += 1;
      }
      console.log(
        "当前章节下标",
        this.epIdIndex,
        "章节",
        this.ep_list,
        "章节Id",
        this.ep_list[this.epIdIndex].id
      );
      /* 调用获取漫画内容API（返回漫画的路径） */
      let data = await getImageIndex({ epId: this.ep_list[this.epIdIndex].id });
      console.log(data);
      /* 如果code == 1 付费，0免 */
      if (data.code == 1) {
        Toast("该章节需要付费，莫得看啦~");
        console.log("该章节需要付费，莫得看啦~");
        this.finished = true;
        return;
      }
      this.comicImages = data.data.images;
      /* console.log("host地址", this.host, "漫画图片地址", this.comicImages); */
      /* 获取漫画Token地址方法 */
      let newPath = "";
      for (let i = 0; i < this.comicImages.length; i++) {
        /* newPath.push(this.host + this.comicImages[i].path); */
        newPath = this.host + this.comicImages[i].path + "@1000w.webp";
        /* console.log(newPath); */
        await imageToken({ urls: '["' + newPath + '"]' }).then((data) => {
          /* console.log(data); */
          this.theLastPath.push(
            /* data.data[0].url + "?token=" + data.data[0].token */
            data.data[0].url + "?token=" + data.data[0].token
          );
        });
      }
      /* console.log("最终地址", this.theLastPath); */
      this.loading = false;
      console.log("加载完成");
      // 数据全部加载完成
    },
    /* 显示遮罩层 */
    showPopup() {
      this.show = true;
    },
    /* 返回按钮方法 */
    goback() {
      this.$router.go(-1);
    },
    /* 刷新方法 */
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.refreshing = false;
      }, 1000);
    },
    /* 查看详情方法 */
    goToDetail() {
      this.$router.push({
        name: "comicdetails",
        query: {
          comicId: this.$route.query.comicId,
        },
      });

      console.log("去往详情页");
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getImageIndexFun();
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
.comic {
  min-width: 375px;
  max-width: 750px;
  margin: 0 auto;
  .van-popup--top {
    min-width: 375px;
    max-width: 750px;
    margin: 0 auto;
    top: 0;
    left: unset;
    width: 100%;
  }
  .comicImg {
    .overlay {
      background-color: transparent;
    }
    .van-popup {
      padding: 0 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      font-size: 14px;
      color: white;
      background-color: rgb(30, 33, 44);

      .left {
        display: flex;
        .gobackButton {
          img {
            width: 20px;
          }
        }
      }
      .right {
        display: flex;
        .watchDetail {
          margin-right: 10px;
          padding: 3px 7px;
          font-size: 14px;
          color: rgb(51, 132, 191);
          border: 1px solid rgb(51, 132, 191);
        }
        .rightIcon {
          display: flex;
          align-items: center;
          .bookmark {
            margin-right: 10px;
            align-items: center;
            img {
              display: flex;
              width: 20px;
            }
          }
          .share {
            img {
              display: flex;
              width: 20px;
            }
          }
        }
      }
    }
    .comicImgItem {
      background-image: url(@/assets/images/reader/reader_scroll_placeholder.png)
        no-repeat;
      background-position: center 0;
      background-size: cover;
      background-color: black;
      display: block;
      height: 100%;
      img {
        display: block;
        width: 100%;
      }
    }
    .needPay {
      background-image: url(@/assets/images/reader/reader_scroll_placeholder.png)
        no-repeat;
      background-position: center 0;
      background-size: cover;
      background-color: black;
      display: block;
      height: 280px;
      color: white;
      .imgPlaceholder {
        img {
          width: 100%;
          display: block;
        }
      }
    }
  }
}
</style>