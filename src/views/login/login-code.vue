<template>
  <div class="login-code">
    <navbar>
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="center">手机号验证</div>
    </navbar>
    <div class="send-out">
      <div class="info">
        <p>验证码已发送至</p>
        <p class="num"> <span class="ico">+86</span> 18770971427</p>
      </div>
      <div class="timer">
        <p class="time" v-if="timer!=60">{{ timer }}</p>
        <p class="regain" v-else @click="Regain">重新获取</p>
      </div>
    </div>
    <v-code :count='4'/>
  </div>
</template>

<script lang='ts'>
import navbar from "components/common/navbar/navbar.vue";
import vCode from 'components/content/verify-code/verify-code.vue'
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    navbar,
    vCode
  }
})
export default class LoginCode extends Vue {
  private timer:number = 60
  created() {
    this.startTimer()
  }
  beforeDestory(){
    window.clearInterval((<any>this).flagTimer)
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
  Regain(){}
}
</script>
<style scoped lang='less'>
.login-code {
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