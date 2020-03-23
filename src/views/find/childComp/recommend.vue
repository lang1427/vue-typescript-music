<template>
  <div class="recommend">
    <div class="recommend-item" @click="toast" v-for="item of recommendList" :key="item.name">
      <p :class="[item.ico, 'ico']"></p>
      <p class="title">{{ item.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Recommend extends Vue {
  private recommendList: object[] = [
    { ico: "fa-music", name: "推荐新音乐" },
    { ico: "fa-video-camera", name: "推荐电台" },
    { ico: "fa-list-ol", name: "排行榜" },
    { ico: "fa-volume-up", name: "推荐节目" },
    { ico: "fa-vimeo", name: "推荐MV" }
  ];
  toast(){
    this.$toast('很遗憾，暂未开放此功能')
    return false
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
      height: 35px;
      line-height: 35px;
      border-radius: 50%;
      background-color: @klColor;
      color: white;
      font-size: 18px;
    }
    .title {
      padding-top: 3px;
      font-size: 12px;
    }
  }
}
</style>
