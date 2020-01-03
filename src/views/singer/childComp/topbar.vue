<template>
  <navbar class="topbar">
    <div slot="left" @click="back">
      <span class="fa-arrow-left back"></span>
    </div>
    <div slot="center">
      <h2 class="title">歌手分类</h2>
    </div>
  </navbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import navbar from 'components/common/navbar/navbar.vue'

@Component({
  components: {
    navbar
  }
})
export default class Topbar extends Vue {
  back() {
    this.$router.back()
  }
}
</script>

<style lang="less" scoped>
.topbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0;
  background-color: white;
  z-index: 999;
  .back {
    font-size: 20px;
  }
  .title {
    font-size: 16px;
  }
}
</style>
