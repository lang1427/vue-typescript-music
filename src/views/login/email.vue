<template>
  <div class="login-email">
    <navbar>
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="center">手机号验证</div>
    </navbar>
  </div>
</template>

<script lang='ts'>
import navbar from "components/common/navbar/navbar.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    navbar
  }
})
export default class LoginEmail extends Vue {
  created() {}
}
</script>
<style scoped lang='less'>
.login-email {
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
}
</style>