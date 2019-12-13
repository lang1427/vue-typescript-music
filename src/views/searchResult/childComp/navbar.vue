<template>
  <nav class="navbar">
    <div class="navbar-item" v-for="item of title" :key="item">
      <span>{{ item }}</span>
    </div>
  </nav>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  private title: string[] = [
    "综合",
    "单曲",
    "视频",
    "歌手",
    "专辑",
    "歌单",
    "主播电台",
    "用户"
  ];
}
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  .navbar-item {
    flex: 1;
    display: flex;
    flex-wrap: nowrap;
    span {
      padding: 0 15px;
    }
  }
}
</style>