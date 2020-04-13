<template>
  <div class="login">
    <div class="logo"></div>
    <div class="login-mode">
      <div class="btn" @click="goPhoneLogin">手机号登陆</div>
      <!-- 网易邮箱登陆，接口有问题，暂定使用！ -->
      <!-- <div class="btn" @click="goEmailLogin">网易邮箱登陆</div> -->
    </div>
    <div class="agreement">
      <input type="checkbox" v-model="isAgree" />
      <span class="yes">同意</span>
      《用户协议》 《隐私政策》 《儿童隐私协议》
    </div>
    <router-view />
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
@Component
export default class Login extends Vue {
  private isAgree: boolean = false;

  created() {}
  goPhoneLogin() {
    if (this.isAgree == false) {
      this.$toast("勾选协议");
      return !1;
    }
    this.$router.push("/login/phone");
  }
  goEmailLogin() {
    if (this.isAgree == false) {
      window.alert("勾选协议");
      return !1;
    }
    this.$router.push("/login/email");
  }
}
</script>
<style scoped lang='less'>
.login {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1012;
  background-color: #b00;
  .logo {
    width: 40px;
    height: 60px;
    position: absolute;
    left: 50%;
    top: 120px;
    transform: translateX(-50%);
    background: url("~@/assets/images/logo.png") no-repeat 0px 0px;
  }
  .login-mode {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 200px;
    .btn {
      margin: 10px 35px;
      background-color: #fff;
      text-align: center;
      color: #e00;
      padding: 10px;
      border-radius: 20px;
    }
  }
  .agreement {
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
    font-size: 12px;
    color: white;
    text-align: center;
    .yes {
      color: thistle;
      font-size: 12px;
    }
  }
}
</style>