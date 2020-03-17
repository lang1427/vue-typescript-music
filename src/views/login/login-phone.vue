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
        <p class="num"> <span class="ico">+86</span> {{ $store.getters.encodeLoginAccount }}</p>
      </div>
      <div class="timer">
        <p class="time" v-if="timer!=60">{{ timer }} s</p>
        <p class="regain" v-else @click="Regain">重新获取</p>
      </div>
    </div>
    <v-code :count='4' @inputComplete="getTestVerifyCode"/>
  </div>
</template>

<script lang='ts'>
import navbar from "components/common/navbar/navbar.vue";
import vCode from 'components/content/verify-code/verify-code.vue'
import {sendVerifyCode,testVerifyCode,testIsRegister} from '@/service/login'
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    navbar,
    vCode
  }
})
export default class LoginPhone extends Vue {
  private timer:number = 59
  created() {
    this.startTimer()
    this.getSendVerifyCode()
  }
  beforeDestory(){
    window.clearInterval((<any>this).flagTimer)
  }

  async getSendVerifyCode(){
    let res = await sendVerifyCode(this.$store.state.loginAccount)
    if(res.code===200) console.log('已发送验证码')
  }
  async getTestVerifyCode(inputVal:string){
    let res = await testVerifyCode(this.$store.state.loginAccount,inputVal)
    if(res.code===200) this.getTestIsRegister()
    else window.alert(res.message)
  }
  async getTestIsRegister(){
    let res = await testIsRegister(this.$store.state.loginAccount)
    if(res.code===200) console.log(res)
  }

  back(){
    this.$router.back()
  }
  startTimer(){
    (<any>this).flagTimer = window.setInterval(()=>{
      this.timer --
      if(this.timer ===0){
        this.timer = 60
        window.clearInterval((<any>this).flagTimer)
      }
    },1000)
  }
  Regain(){
    this.startTimer()
    this.getSendVerifyCode()
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
  .send-out{
    margin-top: 25px;
    display: flex;
    align-items: flex-end;
    .info{
      flex: 1;
      padding-left: 15px;
      .num{
        padding-top: 8px;
        color: #666;
        font-size: 13px;
        .ico{
          font-size: 12px;
          color: #999;
        }
      }
    }
    .timer{
      width: 80px;
      .time{
        color: #999;
        font-size: 12px;
      }   
      .regain{
        color: rgb(0, 150, 225);
      }
    }
  }
}
</style>