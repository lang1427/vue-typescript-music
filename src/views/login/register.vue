<template>
  <div class="register">
    <navbar>
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="center">手机号注册</div>
    </navbar>
    <input class="pawd-input" type="password" v-model.trim="pawd" placeholder="设置登录密码，不少于6位" />
    <div class="next" @click="next">下一步</div>
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
export default class Register extends Vue {
  private pawd: string = "";
  created() {}

  back() {
    this.$router.back();
  }
  next() {}
}
</script>
<style scoped lang='less'>
.register {
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
    width: 88%;
    padding-left: 40px;
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
</style>