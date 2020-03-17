<template>
  <div class="email">
    <navbar>
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="center">网易邮箱账号登录</div>
    </navbar>
    <div class="input-box">
      <div class="email-account">
        <input type="text" v-model.trim="emailAccount" placeholder="请输入邮箱账号" />
        <ul class="email-list" v-show="false">
          <li @click="checkEmail(item)" v-for="item of emailList" :key="item">{{ emailAccount + item }}</li>
        </ul>
      </div>
      <div class="email-pawd">
        <input type="password" v-model.trim="emailPawd" placeholder="请输入密码" />
        <span class="forget-pawd" @click="forgetPawd">忘记密码?</span>
      </div>
    </div>
    <div class="login" @click="goEmailLogin">登录</div>
  </div>
</template>

<script lang='ts'>
import navbar from "components/common/navbar/navbar.vue";
import { emailLogin } from "@/service/login";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    navbar
  }
})
export default class Email extends Vue {
  private emailAccount: string = "";
  private emailPawd: string = "";
  private emailList: string[] = [
    "@163.com",
    "@126.com",
    "@yeah.net",
    "@vip.163.com",
    "@vip.126.com",
    "@popo.163.com",
    "@188.com",
    "@qq.com",
    "@yahoo.com",
    "@sina.com",
    "@soho.com",
    "@live.com"
  ];
  // get emailListShow(){
  //   if(this.emailAccount.length >= 2){
  //    return this.emailList.find(item=>{
  //       return !(this.emailAccount.indexOf(item)!= -1)
  //     })
  //   }
  //   return false
  // }
  created() {}
  // checkEmail(val:string){
  //   this.emailAccount = this.emailAccount+val
  // }
  async goEmailLogin() {
    let res = await emailLogin(this.emailAccount, this.emailPawd);
    if (res.code === 200) {
      this.$store.dispatch("loginMode", res.account);
      this.$router.push("/my");
    } else {
      console.log(res.msg || res.message);
    }
  }
  forgetPawd() {
    console.log('暂不支持更换密码，如有需要，请前往对应邮箱官网更换')
  }
  back() {
    this.$router.back();
  }
}
</script>
<style scoped lang='less'>
.email {
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
  .input-box {
    padding: 10px;
    .email-account {
      position: relative;
      .email-list {
        position: absolute;
        left: 0;
        right: 0;
        top: 38px;
        background-color: white;
        box-shadow: 0 2px 16px #ccc, 0 0 1px #ccc, 0 0 1px #ccc;
        z-index: 1010;
        li {
          padding-left: 12px;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #dedede;
          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
    .email-pawd {
      position: relative;
      .forget-pawd {
        color: rgb(0, 210, 220);
        font-size: 12px;
        position: absolute;
        right: 3px;
        bottom: 3px;
      }
    }
    input {
      height: 35px;
      line-height: 35px;
      width: 100%;
      border: none;
      outline: none;
      border-bottom: 1px solid #dedede;
    }
  }
  .login {
    margin: 35px;
    background-color: #e00;
    text-align: center;
    color: #fff;
    padding: 10px;
    border-radius: 20px;
  }
}
</style>