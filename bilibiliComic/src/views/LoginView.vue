==<!-- 登录页 -->
<template>
  <div class="login">
    <div class="login_in">
      <!-- 顶部tab -->
      <div class="tab">
        <div class="close" @click="goBack">
          <img
            src="@/assets/images/reader/2.0x/reader_bookmark_close.png"
            alt=""
          />
        </div>
        <div class="tabText">密码登录</div>
        <div class="changeLogin">注册</div>
      </div>
      <!-- 登录主体 -->
      <div class="loginBody">
        <!-- bilibili图标 -->
        <div class="bilibiliLogo">
          <div class="left22">
            <img v-show="!hide" src="@/assets/images/login/ic_22.png" alt="" />
            <img
              v-show="hide"
              src="@/assets/images/login/ic_22_hide.png"
              alt=""
            />
          </div>
          <div class="bilibili">
            <img src="@/assets/images/login/ic_bili_logo.png" alt="" />
          </div>
          <div class="right33">
            <img v-show="!hide" src="@/assets/images/login/ic_33.png" alt="" />
            <img
              v-show="hide"
              src="@/assets/images/login/ic_33_hide.png"
              alt=""
            />
          </div>
        </div>
        <!-- 输入框 -->
        <div class="textBox">
          <div class="inputBox">
            <input
              class="username"
              v-model="username"
              placeholder="请输入bilibili账号"
            />
            <input
              class="password"
              type="password"
              @focus="focus"
              @blur="blur"
              v-model="password"
              placeholder="请输入密码"
            />
          </div>
          <!-- 同意框 -->
          <div class="agree">
            <van-checkbox icon-size="14px" v-model="checked" shape="square"
              ><span>
                我已阅读并同意
                <span class="blue">"服务协议"</span>
                和
                <span class="blue">"隐私政策"</span>
              </span></van-checkbox
            >
          </div>
          <!-- 登录按钮 -->
          <div class="loginButton">
            <div
              class="loginStart"
              :style="{
                backgroundColor: loginOk
                  ? 'rgb(50,170,255)'
                  : 'rgb(173,221,255)',
              }"
              @click="loginStart"
            >
              登录
            </div>
            <div class="register">注册账号</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
//这里可以导入其他文件(比如:组件,工具js,第三方插件js,json文件,图片文件等等)
//例如:import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      username: "",
      password: "",
      hide: false,
      checked: false,
      loginOk: false,
      userAccount: [
        {
          username: 15013841819,
          password: 28271398,
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {
    userKeyword() {
      const { username, password } = this;
      return {
        username,
        password,
      };
    },
  },
  //监控data中的数据变化
  watch: {
    userKeyword: function (input) {
      console.log(input.username, input.password);
      if (
        input.username != "" &&
        input.username.length >= 6 &&
        input.password != "" &&
        input.password.length >= 6
      ) {
        this.loginOk = true;
      } else {
        this.loginOk = false;
      }
    },
  },
  //方法集合
  methods: {
    /* 让用户先登录 */
    plaseLogin() {
      Toast("请先登录~");
    },
    /* 返回方法 */
    goBack() {
      this.$router.go(-1);
    },
    /* 当用户输入密码时 */
    focus() {
      this.hide = true;
    },
    blur() {
      this.hide = false;
    },
    /* 判断登录条件 */
    loginOkFun() {
      if (this.username != "" && this.password != "") {
        this.loginOk = true;
        console.log(this.loginOk);
      } else {
        this.loginOk = false;
        console.log(this.loginOk);
      }
    },
    /* 登录方法 */
    loginStart() {
      if (this.loginOk) {
        if (this.checked) {
          if (
            this.username == this.userAccount[0].username &&
            this.password == this.userAccount[0].password
          ) {
            localStorage.setItem("token", 1145141919810);
            Toast("登陆成功");
            let Login = {
              code: 200,
              loginType: 0,
              Action: "登录成功~",
            };
            console.log(Login);
            this.$router.push({ name: "my" });
          } else {
            Toast("账号或密码错误,请重试");
            return;
          }
        } else {
          Toast("请同意“服务协议”及“隐私政策”");
        }
      } else {
        return;
      }
    },
  },
  //生命周期 - 创建完成(可以访问当前this实例)
  created() {},
  //生命周期 - 挂载完成(可以访问DOM元素)
  mounted() {
    this.plaseLogin();
  },
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
.login {
  font-style: mine;
  width: 100vw;
  .login_in {
    min-width: 375px;
    max-width: 750px;
    margin: 0 auto;
    .tab {
      width: 100%;
      padding: 0.2667rem 0.3733rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.0267rem solid rgb(238, 238, 238);
      .close {
        img {
          display: block;
          width: 0.5333rem;
        }
      }
      .tabText {
        font-size: 16x;
      }
    }
    .loginBody {
      margin-top: 0.8rem;
      .bilibiliLogo {
        display: flex;
        justify-content: space-between;
        .left22 {
          img {
            width: 1.8667rem;
          }
        }
        .bilibili {
          img {
            width: 3.0667rem;
          }
        }
        .right33 {
          img {
            width: 1.8667rem;
          }
        }
      }
    }
    .textBox {
      padding: 0.48rem;
      .inputBox {
        .input::input-placeholder {
          color: rgb(231, 231, 233);
        }
        .username {
          width: 90%;
          padding-bottom: 0.4rem;
          border: none;
          font-size: 0.3733rem;
          margin-bottom: 0.6667rem;
          border-bottom: 0.0267rem solid rgb(231, 231, 233);
        }
        .password {
          width: 90%;
          padding-bottom: 0.4rem;
          border: none;
          font-size: 0.3733rem;
          margin-bottom: 0.5333rem;
          border-bottom: 0.0267rem solid rgb(231, 231, 233);
        }
      }
      .agree {
        padding: 0 0.3733rem;
        display: flex;
        align-items: center;
        font-size: 0.32rem;
        .blue {
          color: rgb(80, 182, 255);
        }
      }
      .loginButton {
        font-size: 0.3733rem;
        .loginStart {
          color: white;
          margin-top: 0.2667rem;
          padding: 0.32rem 0;
          border-radius: 0.8rem;
        }
        .register {
          margin-top: 0.4533rem;
          color: rgb(76, 181, 255);
          padding: 0.32rem 0;
          border: 0.0267rem solid rgb(76, 181, 255);
          border-radius: 0.8rem;
        }
      }
    }
  }
}
</style>