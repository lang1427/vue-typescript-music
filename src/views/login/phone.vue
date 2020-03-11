<template>
  <div class="login-phone">
    <navbar>
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="center">手机号登录</div>
    </navbar>
    <div class="explain">未注册手机号登录后将自动创建账号</div>
    <div class="phone-box">
      <span class="ico">+86</span>
      <input class="phone-input" type="text"   placeholder="请输入手机号" />
    </div>
    <div class="next">下一步</div>
  </div>
</template>

<script lang='ts'>
import navbar from "components/common/navbar/navbar.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    navbar
  }
})
export default class LoginPhone extends Vue {

  created() {}
  back() {
    this.$router.back();
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
  .explain {
    color: #999;
    font-size: 12px;
    padding: 20px 12px;
  }
  .phone-box {
    position: relative;
    margin: 0 10px;
    .ico {
      position: absolute;
      left: 10px;
      color: #555;
      bottom: 10px;
      color: #999;
      &.active{
          color: #333;
      }
    }
    .phone-input {
      height: 35px;
      line-height: 35px;
      width: 88%;
      padding-left: 40px;
      border: none;
      outline: none;
      border-bottom: 1px solid #dedede;
    }
  }
  .next {
    margin:35px;
    background-color: #e00;
    text-align: center;
    color: #fff;
    padding: 10px;
    border-radius: 20px;
  }
}
</style>