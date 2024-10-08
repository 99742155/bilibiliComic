<!-- 我的页 -->
<template>
  <div class="myView">
    <!-- 加载动画 -->
    <div class="loading" v-if="!userInfo">
      <img src="@/assets/loading.jpg" alt="" />
      怎么还没好~
    </div>
    <div class="loadingFinish" v-show="userInfo">
      <div class="infoBox">
        <div class="topInfo">
          <div class="left">
            <div class="avatar"><img :src="userInfo.avatar" alt="" /></div>
            <div class="nickName">
              {{ userInfo.nickname }}
              <img
                v-if="userInfo"
                :src="
                  require('@/assets/images/club/club_v' +
                    userInfo.level +
                    '.png')
                "
                alt=""
              />
            </div>
          </div>
          <div class="right">
            <div class="toInfoDetails">
              <img
                src="@/assets/images/reader/2.0x/reader_bookmark_arrow.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <!-- 卡券 -->
        <div class="userWallet">
          <div class="cardVoucher">
            <div class="title">卡券包</div>
            {{ cardVoucher }}
          </div>
          <!-- 月票 -->
          <div class="monthlyTicket">
            <div class="title">月票</div>
            {{ monthlyTicket }}
          </div>
          <!-- 漫笔 -->
          <div class="comicCoin">
            <div class="title">漫币</div>
            {{ comicCoin }}
            <span class="toTopup">去充值></span>
          </div>
        </div>
        <!--畅读卡 -->
        <div class="ReadFreelyCard">
          <div class="left">
            <div class="img">
              <img
                src="@/assets//images/dialog/dialog_img_benefit_joy_dera.png"
              />
            </div>
            <div class="cardName">畅读卡</div>
            <div class="hasArive">| 全部通用券已到账</div>
          </div>
          <div class="right">
            <img
              src="@/assets/images/reader/2.0x/reader_bookmark_arrow.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="welfareCenter">
        <div class="left" @click="noFinfish">
          <div class="img">
            <img src="@/assets/images/vip/icon_gift_card.png" alt="" />
            福利中心
          </div>
        </div>
        <div class="right" @click="noFinfish">
          <div class="img">
            <svg
              height="25"
              viewBox="0 0 28 28"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fill-rule="evenodd" transform="translate(2)">
                <path
                  d="m12.0002 26.5313343v-12.5313093l10.971136-6.26639347v12.43962127z"
                  fill="#d5f5ec"
                />
                <g transform="translate(-.000249 -.000225)">
                  <path
                    d="m11.9995 2.4385c-.133 0-.268.035-.387.104l-.001.001-9.346 5.391c-.24.139-.389.397-.389.674v10.782c0 .278.149.537.389.674l9.346 5.393c.239.137.537.14.776 0l9.347-5.393c.24-.137.389-.396.389-.674v-10.782c0-.277-.149-.535-.389-.674l-9.346-5.391c-.12-.07-.254-.105-.389-.105zm.001 24.677c-.403 0-.807-.103-1.168-.311l-9.345-5.392c-.719-.415-1.166-1.19-1.166-2.022v-10.782c0-.831.447-1.605 1.166-2.021l9.346-5.392c.72-.416 1.614-.416 2.333.001l9.345 5.391c.721.416 1.168 1.19 1.168 2.021v10.782c0 .832-.447 1.607-1.168 2.022l-9.345 5.392c-.359.209-.762.311-1.166.311z"
                    fill="#4a4c57"
                  />
                  <path
                    d="m18.7478 10.1042c.301.521.122 1.187-.398 1.488l-5.2615077 3.0367544.0005077 6.0743456c0 .602-.487 1.089-1.089 1.089s-1.089-.487-1.089-1.089l-.0005077-6.0743456-5.2604923-3.0367544c-.519-.301-.698-.967-.398-1.488.303-.521.97-.698 1.488-.399l5.2594923 3.0367544 5.2615077-3.0367544c.52-.299 1.186-.122 1.487.399z"
                    fill="#2ecea0"
                  />
                </g>
              </g>
            </svg>
            赛季积分商城
          </div>
        </div>
      </div>
      <div class="activity">
        <div class="comicShop">
          <img src="@/assets/activity/1.png" alt="" />
          漫画商城
        </div>
        <div class="activityCenter">
          <img src="@/assets/activity/2.png" alt="" />
          活动中心
        </div>
        <div class="gift">
          <img src="@/assets/activity/3.png" alt="" />
          邀请有礼
        </div>
        <div class="myBuyed">
          <img src="@/assets/activity/4.png" alt="" />
          我的已购
        </div>
      </div>
      <div class="allSetting">
        <img src="@/assets/allSetting.png" alt="" />
      </div>
      <div class="loginOut" @click="loginOut">退出登录</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';
import { getBaseSpaceInfo } from "@/api/userinfo";
import { Toast } from "vant";
import { Dialog } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      cardVoucher: 7,
      monthlyTicket: 0,
      comicCoin: 2405,
      userInfo: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    /* 获取用户书架（收藏）方法 */
    getBaseSpaceInfoFun() {
      getBaseSpaceInfo({ uid: 86984521, pageNum: this.pageNum }).then(
        (data) => {
          this.userInfo = data.data;
          console.log(this.userInfo);
        }
      );
    },
    /* 未完成方法 */
    noFinfish() {
      Toast("敬请期待~");
    },
    /* 退出登录方法 */
    loginOut() {
      Dialog.confirm({
        title: "退出登录?",
        message: "您确定要退出登录吗，退出后需要重新登录获取个人信息及书架",
      })
        .then(() => {
          Toast("退出成功~");
          window.localStorage.removeItem("token");
          let unLogin = {
            code: 200,
            loginType: 1,
            Action: "退出成功~",
          };
          console.log(unLogin);
          this.$router.push({ name: "home" });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {
    this.getBaseSpaceInfoFun();
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
<style lang="scss" >
.myView {
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
  /*   background-color: rgb(249, 250, 253); */
  .loadingFinish {
    max-width: 750px;
    min-width: 375px;
    margin: 0 auto;
    height: 100vh;
    padding: 1.12rem 0.3733rem 0 0.3733rem;
    box-sizing: border-box;
    .infoBox {
      height: 4.4533rem;
      background-color: white;
      border-radius: 0.1333rem;
      padding: 0 0.2667rem;
      box-sizing: border-box;
      margin-bottom: 0.5333rem;
      box-shadow: 0.08rem 0.08rem 0.2667rem 0rem rgb(0 0 0 / 15%);
      .topInfo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .avatar {
            width: 1.1733rem;
            height: 1.1733rem;
            position: relative;
            img {
              top: -0.1333rem;
              left: 0;
              position: absolute;
              width: 1.1733rem;
              border-radius: 50%;
            }
          }
          .nickName {
            margin-top: 0.4rem;
            margin-left: 0.4rem;
            font-size: 0.3733rem;
            img {
              margin-top: 0.1333rem;
              display: block;
              height: 0.5333rem;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          .toInfoDetails {
            img {
              height: 0.3733rem;
            }
          }
        }
      }
      .userWallet {
        display: flex;
        align-items: center;

        .cardVoucher {
          text-align: left;
          padding-right: 1.3333rem;
          border-right: 0.0267rem solid rgb(244, 244, 244);
          .title {
            margin-bottom: 0.08rem;
            font-size: 0.2667rem;
            color: rgb(112, 115, 129);
          }
        }
        .monthlyTicket {
          text-align: left;
          margin-left: 0.1333rem;
          padding-right: 1.3333rem;
          border-right: 0.0267rem solid rgb(244, 244, 244);
          .title {
            margin-bottom: 0.08rem;
            font-size: 0.2667rem;
            color: rgb(112, 115, 129);
          }
        }
        .comicCoin {
          text-align: left;
          margin-left: 0.1333rem;
          .title {
            margin-bottom: 0.08rem;
            font-size: 0.2667rem;
            color: rgb(112, 115, 129);
          }
          .toTopup {
            margin-left: 0.2667rem;
            color: rgb(255, 203, 130);
            font-size: 0.2667rem;
          }
        }
      }
      .ReadFreelyCard {
        height: 1.12rem;
        margin-top: 0.4267rem;
        border-radius: 0.1333rem;
        background-image: url(@/assets/images/vip/vip_card_open_bg.png);
        background-size: 100% 1.12rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          .img {
            width: 1.5467rem;
            position: relative;
            img {
              position: absolute;
              top: -0.32rem;
              left: -0.0533rem;
              display: block;
              height: 1.28rem;
            }
          }
          .cardName {
            font-size: 0.4267rem;
            color: rgb(162, 97, 62);
            line-height: 1.12rem;
            font-family: BigRuixain;
          }
          .hasArive {
            margin-left: 0.1333rem;
            font-size: 0.2667rem;
            color: rgb(208, 179, 137);
            line-height: 1.12rem;
          }
        }
        .right {
          margin-right: 0.08rem;
          img {
            height: 0.32rem;
          }
        }
      }
    }
    .welfareCenter {
      display: flex;
      .left {
        margin-left: 0.3733rem;
        font-size: 0.32rem;
        margin-right: 2.4rem;
        .img {
          display: flex;
          align-items: center;
          img {
            margin-right: 0.3733rem;
            width: 0.6667rem;
          }
        }
      }
      .right {
        font-size: 0.32rem;
        .img {
          svg {
            margin-right: 0.3733rem;
          }
          display: flex;
          align-items: center;
        }
      }
    }
    .activity {
      padding: 0.32rem;
      margin-top: 0.2667rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 0.32rem;
      color: rgb(137, 142, 151);
      padding-bottom: 0.5333rem;
      border-bottom: 0.0267rem solid rgb(242, 242, 242);
      img {
        margin: 0 auto;
        display: block;
        width: 1.0667rem;
        height: 1.0667rem;
      }
      .comicShop {
        align-items: center;
      }
      .activityCenter {
      }
      .gift {
      }
      .myBuyed {
      }
    }
    .allSetting {
      margin-top: 0.2667rem;
      img {
        width: 100%;
      }
    }
    .loginOut {
      margin-top: 0.4533rem;
      color: rgb(76, 181, 255);
      padding: 0.32rem 0;
      border: 0.0267rem solid rgb(76, 181, 255);
      border-radius: 0.8rem;
    }
  }
}
</style>