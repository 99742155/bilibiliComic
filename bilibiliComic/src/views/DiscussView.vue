<!-- 讨论区 -->
<template>
  <div class="discussView">
    <!-- 加载动画 -->
    <div class="loading" v-if="!replayMain">
      <img src="@/assets/loading.jpg" alt="" />
      怎么还没好~
    </div>
    <div class="top" v-if="replayMain">
      <van-nav-bar
        :title="'讨论区(' + replayMain.cursor.all_count + ')'"
        left-arrow
        @click-left="goback"
        :fixed="true"
      />
    </div>
    <div class="discussBody" v-if="replayMain">
      <div class="top">
        <span>热门评论</span
        ><span class="count">{{ replayMain.cursor.all_count }}</span>
      </div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="discussUpperItem" v-if="replayMain.top.upper">
          <div class="avater">
            <img
              :src="replayMain.top.upper.member.avatar + '@100w.jpg'"
              alt=""
            />
          </div>
          <div class="userText">
            <div class="userName">
              {{ replayMain.top.upper.member.uname }}

              <img
                v-if="replayMain.top.upper.member.club_level != 0"
                :src="
                  require('@/assets/images/club/club_v' +
                    replayMain.top.upper.member.club_level +
                    '.png')
                "
                alt=""
              />
            </div>
            <div class="upTime">
              {{ replayMain.top.upper.reply_control.time_desc }}
            </div>
            <div class="commentText">
              <img src="@/assets/images/comment/ic_comment_top.png" alt="" />
              {{ replayMain.top.upper.content.message }}
            </div>
            <div class="like">
              <span
                class="isLike"
                @click="
                  like(replayMain.top.upper.like, replayMain.top.upper.oid)
                "
              >
                <svg
                  height="14"
                  viewBox="0 0 22 20"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6.125 17.743635h1.35v-10.57500002h-1.35zm7.575-12.00000002h5.625c.675 0 1.35.3 1.8.9.375.525.45 1.275.3 1.875l-2.4 7.95000002c-.375 1.5-1.65 2.55-3.225 2.625h-12.6c-.975.075-1.875-.45-2.325-1.275-.225-.45-.375-.9-.375-1.35v-8.02500002c0-.975.525-1.875 1.35-2.325.45-.225.9-.3 1.35-.375h3.375l3.675-4.575c.75-.825 2.1-.9 2.925-.15.45.45.75 1.05.675 1.725zm5.475 1.35h-6.975l.15-1.575.225-2.775c.075-.375-.15-.75-.525-.825-.225-.075-.525 0-.675.225l-3.45 4.425-.45.6h-4.5c-.15 0-.3.075-.45.15-.45.225-.675.675-.675 1.125v8.02500002c0 .225.075.525.225.675.225.45.675.675 1.125.6h12.6c.3 0 .525-.075.75-.225.6-.3 1.05-.825 1.125-1.5l2.4-7.87500002 1.35.3-1.35-.3c.075-.225 0-.525-.075-.75-.225-.15-.525-.3-.825-.3l.15-1.35z"
                    fill="#6c6f7e"
                  />
                </svg>
                {{ replayMain.top.upper.like }}
              </span>
              <span class="unLike" @click="unLike(replayMain.top.upper.oid)">
                <svg
                  height="14"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m4.75 10.0665868h.9v-7.04999996h-.9zm5.05.9505.15 2c.05.4495-.15.8495-.45 1.15-.55.5-1.45.4495-1.95-.1005l-2.45-3.0495h-2.3c-.3 0-.6-.1-.9-.25-.55-.3005-.9-.90049996-.9-1.55049996v-5.3495c0-.3005.1-.6005.25-.9005.3-.5995.9-.95 1.55-.8495h8.4c1.05.05 1.9.75 2.15 1.75l1.6 5.3c.1.4495.05.89949996-.2 1.24999996-.3.35-.75.6-1.2.6zm3.65-.9005.1.9005-.1-.9005c.2 0 .4-.05.55-.19949996.1-.15.1-.3505.05-.5l.9-.2005-.9.2005-1.55-5.25c-.1-.4505-.4-.8-.75-1-.15-.1005-.35-.1505-.5-.1505h-8.4c-.35-.05-.65.1005-.8.4005-.1.1495-.1.2995-.15.45v5.3495c0 .3005.15.6.45.75.1.05049996.2.09999996.3.09999996h3l.3.4 2.3 2.9505c.1.1495.3.1995.45.1495.25-.0495.4-.2995.35-.5495l-.15-1.85-.1-1.0505z"
                    fill="#90929b"
                  />
                </svg>
              </span>
              <span class="reply">
                <svg
                  height="14"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6.1519 15.0244c-.123.097-.275.149-.432.149-.387 0-.7-.313-.7-.7v-1.675c-2.346-.653-4.02-2.803-4.02-5.298 0-3.038 2.463-5.5 5.5-5.5h3c3.037 0 5.5 2.462 5.5 5.5 0 3.037-2.463 5.5-5.5 5.5h-.77zm2.232-3.024h1.116c2.485 0 4.5-2.015 4.5-4.5 0-2.486-2.015-4.5-4.5-4.5h-3c-2.485 0-4.5 2.014-4.5 4.5 0 2.156 1.528 3.998 3.617 4.413l.403.08v1.863z"
                    fill="#90929b"
                  />
                </svg>
                {{ replayMain.top.upper.rcount }}
              </span>
            </div>
            <div class="replyBox">
              <div
                class="replyItem"
                v-for="(item, index) in replayMain.top.upper.replies"
                :key="index"
              >
                <span class="replyUserName">{{ item.member.uname }}:</span>
                <span class="replyContent">{{ item.content.message }}</span>
              </div>
              <div class="moreReply">
                {{ replayMain.top.upper.reply_control.sub_reply_entry_text }}>
              </div>
            </div>
          </div>
        </div>
        <div
          class="discussItem"
          v-for="(item, index) in replayMains"
          :key="index"
        >
          <div class="avater">
            <img :src="item.member.avatar + '@100w.jpg'" alt="" />
          </div>
          <div class="userText">
            <div class="userName">
              {{ item.member.uname }}
              <img
                v-if="item.member.club_level != 0 && item.member.club_level"
                :src="
                  require('@/assets/images/club/club_v' +
                    item.member.club_level +
                    '.png')
                "
                alt=""
              />
            </div>
            <div class="upTime">
              {{ item.reply_control.time_desc }}
            </div>
            <div class="commentText">
              {{ item.content.message }}
            </div>
            <div class="like">
              <span
                class="isLike"
                v-if="!liked"
                @click="like(item.like, item.oid)"
              >
                <svg
                  height="14"
                  viewBox="0 0 22 20"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6.125 17.743635h1.35v-10.57500002h-1.35zm7.575-12.00000002h5.625c.675 0 1.35.3 1.8.9.375.525.45 1.275.3 1.875l-2.4 7.95000002c-.375 1.5-1.65 2.55-3.225 2.625h-12.6c-.975.075-1.875-.45-2.325-1.275-.225-.45-.375-.9-.375-1.35v-8.02500002c0-.975.525-1.875 1.35-2.325.45-.225.9-.3 1.35-.375h3.375l3.675-4.575c.75-.825 2.1-.9 2.925-.15.45.45.75 1.05.675 1.725zm5.475 1.35h-6.975l.15-1.575.225-2.775c.075-.375-.15-.75-.525-.825-.225-.075-.525 0-.675.225l-3.45 4.425-.45.6h-4.5c-.15 0-.3.075-.45.15-.45.225-.675.675-.675 1.125v8.02500002c0 .225.075.525.225.675.225.45.675.675 1.125.6h12.6c.3 0 .525-.075.75-.225.6-.3 1.05-.825 1.125-1.5l2.4-7.87500002 1.35.3-1.35-.3c.075-.225 0-.525-.075-.75-.225-.15-.525-.3-.825-.3l.15-1.35z"
                    fill="#6c6f7e"
                  />
                </svg>
                {{ item.like }}
              </span>
              <span class="isLike" v-if="liked">
                <svg
                  height="14"
                  viewBox="0 0 22 20"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6.125 17.743635h1.35v-10.57500002h-1.35zm7.575-12.00000002h5.625c.675 0 1.35.3 1.8.9.375.525.45 1.275.3 1.875l-2.4 7.95000002c-.375 1.5-1.65 2.55-3.225 2.625h-12.6c-.975.075-1.875-.45-2.325-1.275-.225-.45-.375-.9-.375-1.35v-8.02500002c0-.975.525-1.875 1.35-2.325.45-.225.9-.3 1.35-.375h3.375l3.675-4.575c.75-.825 2.1-.9 2.925-.15.45.45.75 1.05.675 1.725z"
                    fill="#32aaff"
                    fill-rule="evenodd"
                  />
                </svg>
                {{ item.like }}
              </span>
              <span class="unLike" @click="unLike(item.oid)">
                <svg
                  height="14"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m4.75 10.0665868h.9v-7.04999996h-.9zm5.05.9505.15 2c.05.4495-.15.8495-.45 1.15-.55.5-1.45.4495-1.95-.1005l-2.45-3.0495h-2.3c-.3 0-.6-.1-.9-.25-.55-.3005-.9-.90049996-.9-1.55049996v-5.3495c0-.3005.1-.6005.25-.9005.3-.5995.9-.95 1.55-.8495h8.4c1.05.05 1.9.75 2.15 1.75l1.6 5.3c.1.4495.05.89949996-.2 1.24999996-.3.35-.75.6-1.2.6zm3.65-.9005.1.9005-.1-.9005c.2 0 .4-.05.55-.19949996.1-.15.1-.3505.05-.5l.9-.2005-.9.2005-1.55-5.25c-.1-.4505-.4-.8-.75-1-.15-.1005-.35-.1505-.5-.1505h-8.4c-.35-.05-.65.1005-.8.4005-.1.1495-.1.2995-.15.45v5.3495c0 .3005.15.6.45.75.1.05049996.2.09999996.3.09999996h3l.3.4 2.3 2.9505c.1.1495.3.1995.45.1495.25-.0495.4-.2995.35-.5495l-.15-1.85-.1-1.0505z"
                    fill="#90929b"
                  />
                </svg>
              </span>
              <span class="reply">
                <svg
                  height="14"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m6.1519 15.0244c-.123.097-.275.149-.432.149-.387 0-.7-.313-.7-.7v-1.675c-2.346-.653-4.02-2.803-4.02-5.298 0-3.038 2.463-5.5 5.5-5.5h3c3.037 0 5.5 2.462 5.5 5.5 0 3.037-2.463 5.5-5.5 5.5h-.77zm2.232-3.024h1.116c2.485 0 4.5-2.015 4.5-4.5 0-2.486-2.015-4.5-4.5-4.5h-3c-2.485 0-4.5 2.014-4.5 4.5 0 2.156 1.528 3.998 3.617 4.413l.403.08v1.863z"
                    fill="#90929b"
                  />
                </svg>
                {{ item.rcount }}
              </span>
            </div>
            <div class="replyBox" v-show="item.replies">
              <div
                class="replyItem"
                v-for="(replyItem, index) in item.replies"
                :key="index"
              >
                <span class="replyUserName">{{ replyItem.member.uname }}:</span>
                <span class="replyContent">
                  {{ replyItem.content.message }}
                </span>
              </div>
              <div class="moreReply">
                {{ item.reply_control.sub_reply_entry_text }}>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <div class="setComment" v-if="replayMain">
      <input v-model="commentText" type="text" placeholder="发一条友善的评论" />
      <div class="setButton" @click="setComment">发送</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { getReplyMain } from "@/api/comic";
import { Toast } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      replayMain: "",
      replayMains: [],
      loading: false,
      finished: false,
      next: 0,
      commentText: "",
      liked: false,
      AllAction: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* 返回方法 */
    goback() {
      this.$router.go(-1);
    },
    /* 获取漫画讨论区方法 */
    getReplyMainFun() {
      let oid = this.$route.query.comicId;
      getReplyMain({ oid: oid, mode: 3, ps: 20 }).then((data) => {
        this.replayMain = data.data;
        console.log(this.replayMain);
      });
    },
    /* 下拉加载方法 */
    onLoad() {
      // 异步更新数据
      this.next += 1;
      let oid = this.$route.query.comicId;
      getReplyMain({ oid: oid, mode: 3, ps: 20, next: this.next }).then(
        (data) => {
          this.replayMain = data.data;
          this.replayMains.push(...data.data.replies);
          console.log(this.replayMain);
          this.loading = false;
        }
      );
    },
    /* 发言方法 */
    setComment() {
      if (this.commentText == "") {
        Toast("发送内容不能为空！");
      } else {
        let commentContent = {
          code: 200,
          commentText: this.commentText,
          time: new Date().toLocaleString(),
        };
        console.log(commentContent);
        this.commentText = "";
        Toast("发送成功~");
        this.AllAction.push(commentContent);
      }
    },
    /* 喜欢方法 */
    like(num, oid) {
      let liked = {
        liked: 1,
        oid: oid,
        afterLikeNum: (num += 1),
        likeTime: new Date().toLocaleString(),
      };
      Toast("点赞成功~");
      this.AllAction.push(liked);
      console.log(liked);
    },
    /* 不喜欢方法 */
    unLike(oid) {
      let liked = {
        liked: 0,
        oid: oid,
        likeTime: new Date().toLocaleString(),
      };
      Toast("点踩成功~");
      console.log(liked);
      this.AllAction.push(liked);
    },
    /* 发送全部方法 */
    sendAllFun() {
      let all = {
        code: 200,
        type: "comments",
        action: this.AllAction,
      };
      console.log("离开页面开始发送请求", all);
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getReplyMainFun();
  },
  //生命周期 - 挂载完成(可以访问DOM元素)
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {
    this.sendAllFun();
  }, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能,这个函数会触发
};
</script>
<style lang="scss" scoped>
.discussView {
  width: 100vw;
  .loading {
    width: 3.8667rem;
    height: 1.6rem;
    margin: auto;
    margin-top: 40vh;
    display: flex;
    align-items: center;
    font-size: 0.3733rem;
    color: rgb(173, 174, 181);
    img {
      height: 1.3333rem;
    }
  }
  .top {
  }
  .discussBody {
    max-width: 750px;
    min-width: 375px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 0.3733rem;
    margin-top: 1.3333rem;
    .top {
      font-size: 0.3467rem;
      display: flex;
      .count {
        margin-left: 0.1333rem;
        font-size: 0.32rem;
        padding: 0 0.1333rem;
        color: rgb(226, 226, 226);
        border: 0.0267rem solid rgb(226, 226, 226);
        border-radius: 0.4rem;
      }
    }
    .discussUpperItem {
      margin-top: 0.3733rem;
      display: flex;
      padding-bottom: 0.2667rem;
      border-bottom: 0.0267rem solid rgb(254, 254, 254);
      .avater {
        img {
          width: 0.6667rem;
          border-radius: 50%;
        }
      }
      .userText {
        margin-left: 0.32rem;
        text-align: left;
        .userName {
          display: flex;
          align-items: center;
          font-size: 0.3733rem;
          img {
            margin-left: 0.16rem;
            height: 0.5333rem;
          }
        }
        .upTime {
          margin-top: 0.1333rem;
          margin-bottom: 0.2133rem;
          font-size: 0.2133rem;
          color: rgb(175, 176, 183);
        }
        .commentText {
          font-size: 0.3733rem;
          img {
            height: 0.3733rem;
          }
        }
        .like {
          margin: 0.32rem 0;
          font-size: 0.2667rem;
          color: rgb(150, 152, 160);
          .isLike {
            margin-right: 0.5333rem;
          }
          .unLike {
            margin-right: 0.5333rem;
          }
        }
        .replyBox {
          font-size: 0.32rem;
          padding: 0.3733rem;
          background-color: rgb(245, 246, 248);
          .replyItem {
            margin-bottom: 0.32rem;
            .replyUserName {
              color: rgb(69, 178, 254);
            }
            .replyComment {
              color: rgb(181, 183, 192);
            }
          }
          .moreReply {
            color: rgb(69, 178, 254);
          }
        }
      }
    }
    .discussItem {
      margin-top: 0.3733rem;
      display: flex;
      padding-bottom: 0.4rem;
      border-bottom: 0.0267rem solid rgb(245, 246, 248);
      .avater {
        img {
          width: 0.6667rem;
          border-radius: 50%;
        }
      }
      .userText {
        margin-left: 0.32rem;
        text-align: left;
        .userName {
          display: flex;
          align-items: center;
          font-size: 0.3733rem;
          img {
            margin-left: 0.16rem;
            height: 0.5333rem;
          }
        }
        .upTime {
          margin-top: 0.1333rem;
          margin-bottom: 0.2133rem;
          font-size: 0.2133rem;
          color: rgb(175, 176, 183);
        }
        .commentText {
          font-size: 0.3733rem;
          img {
            height: 0.3733rem;
          }
        }
        .like {
          margin: 0.32rem 0;
          font-size: 0.2667rem;
          color: rgb(150, 152, 160);
          .isLike {
            margin-right: 0.5333rem;
          }
          .unLike {
            margin-right: 0.5333rem;
          }
        }
        .replyBox {
          font-size: 0.32rem;
          padding: 0.3733rem;
          background-color: rgb(245, 246, 248);
          // .replyItem {
          //   width: 7.6rem;
          //   margin-bottom: .32rem;
          //   .replyUserName {
          //     color: rgb(69, 178, 254);
          //   }
          //   .replyComment {
          //     overflow: hidden;
          //     color: rgb(181, 183, 192);
          //   }
          // }
          .replyItem {
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 0.32rem;
            .replyUserName {
              // display: block;
              color: rgb(69, 178, 254);

              // flex-wrap: wrap;
            }
            .replyComment {
              // display: block;
            }
          }
          .moreReply {
            color: rgb(69, 178, 254);
          }
        }
      }
    }
  }
  .setComment {
    max-width: 750px;
    min-width: 375px;
    margin: 0 auto;
    padding-left: 0.3733rem;
    box-sizing: border-box;
    position: sticky;
    bottom: 0;
    background-color: #fff;
    height: 1.2rem;
    border-top: 0.0267rem solid rgb(243, 243, 243);
    display: flex;
    align-items: center;
    input {
      height: 0.8rem;
      border-radius: 0.4rem;
      padding: 0 0.5333rem;
      font-size: 0.32rem;
      width: 100%;
      border: none; /*  */
      background-color: rgb(241, 241, 243);
    }
    .setButton {
      text-align: center;
      width: 1.3333rem;
      color: rgb(220, 220, 223);
      font-size: 0.32rem;
    }
  }
}
</style>