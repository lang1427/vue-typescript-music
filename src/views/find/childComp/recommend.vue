<template>
  <div class="recommend">
    <div
      class="recommend-item"
      @click="toast(item.path)"
      v-for="item of recommendList"
      :key="item.name"
    >
      <img :src="item.ico" class="ico" />
      <p class="title">{{ item.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Recommend extends Vue {
  private recommendList: object[] = [
    { ico: require("../image/music.svg"), name: "推荐新音乐" },
    { ico: require("../image/diantai.svg"), name: "推荐电台" },
    { ico: require("../image/paihang.svg"), name: "排行榜", path: "/rankingList" },
    { ico: require("../image/jiemu.svg"), name: "推荐节目" },
    { ico: require("../image/mv.svg"), name: "推荐MV" }
  ];
  toast(path: string) {
    if (path) {
      this.$router.push(path);
      return
    }
    this.$toast("很遗憾，暂未开放此功能");
    return false;
  }
}
</script>

<style lang="less" scoped>
.recommend {
  margin: 10px 0;
  display: flex;
  .recommend-item {
    flex: 1;
    text-align: center;
    padding: 0 5px;
    .ico {
      height: 25px;
    }
    .title {
      padding-top: 3px;
      font-size: 12px;
    }
  }
}
</style>
