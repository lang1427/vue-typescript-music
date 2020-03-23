<template>
  <div class="login-phone">
    <navbar>
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="center">手机号验证</div>
    </navbar>
    <div class="send-out">
      <div class="info">
        <p>验证码已发送至</p>
        <p class="num">
          <span class="ico">+86</span>
          {{ $store.getters.encodeLoginAccount }}
        </p>
      </div>
      <div class="timer">
        <p class="time" v-if="timer!=60">{{ timer }} s</p>
        <p class="regain" v-else @click="Regain">重新获取</p>
      </div>
    </div>
    <v-code :count="4" @inputComplete="getTestVerifyCode" />

    <!-- 密码输入层 -->
    <div class="pawd-box" v-show="pawdShow">
      <navbar>
        <div slot="left" @click="pawdShow = false">
          <span class="fa-arrow-left back"></span>
        </div>
        <div slot="center">手机号登录</div>
      </navbar>
      <input class="pawd-input" type="password" v-model.trim="pawd" placeholder="输入登录密码，不少于6位" />
      <div class="next" @click="login">登录</div>
    </div>
  </div>
</template>

<script lang='ts'>
import navbar from "components/common/navbar/navbar.vue";
import vCode from "components/content/verify-code/verify-code.vue";
import {
  sendVerifyCode,
  testVerifyCode,
  testIsRegister,
  phoneLogin
} from "@/service/login";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    navbar,
    vCode
  }
})
export default class LoginPhone extends Vue {
  private timer: number = 59;
  private verifycodeVal: string = "";
  private pawd: string = "";
  private pawdShow: boolean = false;
  created() {
    this.startTimer();
    this.getSendVerifyCode();
  }
  beforeDestory() {
    window.clearInterval((<any>this).flagTimer);
    (<any>this).$bus.$emit("verifycodeVal", this.verifycodeVal);
  }

  async getSendVerifyCode() {
    let res = await sendVerifyCode(this.$store.state.loginAccount);
    if (res.code === 200) this.$toast("已发送验证码");
  }
  async getTestVerifyCode(inputVal: string) {
    this.verifycodeVal = inputVal;
    let res = await testVerifyCode(this.$store.state.loginAccount, inputVal);
    if (res.code === 200) this.getTestIsRegister();
    else this.$toast(res.message);
  }
  async getTestIsRegister() {
    let res = await testIsRegister(this.$store.state.loginAccount);
    if (res.code === 200) {
      if (res.exist === -1) {
        this.$router.push("/register");
      } else {
        // 手机登陆
        this.pawdShow = true;
      }
    }
  }
  async login() {
    if (this.pawd == "") {
      this.$toast("请输入密码，在进行登录");
      return !1;
    }
    let res = await phoneLogin(this.$store.state.loginAccount, this.pawd);
    if (res.code === 200) {
      this.$store.dispatch('loginMode',res)
      this.$router.push('/my')
    } else {
      this.$toast(res.message || res.msg);
      this.pawd =''
    }
  }

  back() {
    this.$router.back();
  }
  startTimer() {
    (<any>this).flagTimer = window.setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        this.timer = 60;
        window.clearInterval((<any>this).flagTimer);
      }
    }, 1000);
  }
  Regain() {
    this.startTimer();
    this.getSendVerifyCode();
  }
}
</script>
<style scoped lang='less'>
.login-phone {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 0;
  background-color: white;
  z-index: 999;
  .back {
    font-size: 20px;
  }
  .send-out {
    margin-top: 25px;
    display: flex;
    align-items: flex-end;
    .info {
      flex: 1;
      padding-left: 15px;
      .num {
        padding-top: 8px;
        color: #666;
        font-size: 13px;
        .ico {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .timer {
      width: 80px;
      .time {
        color: #999;
        font-size: 12px;
      }
      .regain {
        color: rgb(0, 150, 225);
      }
    }
  }
  .pawd-box {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 0;
    background-color: white;
    z-index: 999;
    .pawd-input {
      height: 35px;
      line-height: 35px;
      width: 92%;
      margin-left: 10px;
      padding-left: 10px;
      border: none;
      outline: none;
      border-bottom: 1px solid #dedede;
    }
    .next {
      margin: 35px;
      background-color: #e00;
      text-align: center;
      color: #fff;
      padding: 10px;
      border-radius: 20px;
    }
  }
}
</style>