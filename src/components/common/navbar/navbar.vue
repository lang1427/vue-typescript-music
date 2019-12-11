<template>
  <div class="nav-bar">
    <div class="navbar-left">
      <slot name="left"></slot>
    </div>
    <div class="navbar-center">
      <slot name="center"></slot>
    </div>
    <div class="navbar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class NavBar extends Vue {}
</script>

<style lang="less" scoped>
.nav-bar {
  display: flex;
  height: 50px;
  line-height: 50px;
  .navbar-left {
    width: 60px;
    text-align: center;
    line-height: 50px;
  }
  .navbar-center {
    flex: 1;
  }
  .navbar-right {
    width: 60px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
