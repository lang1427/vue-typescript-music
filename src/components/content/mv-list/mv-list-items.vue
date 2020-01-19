<template>
  <div class="mv-list-items">
    <div class="mv-img">
      <img v-lazy="mvListItems.imgurl" />
      <span class="play-count"
        >▷{{ mvListItems.playCount | finalPlayCount }}</span
      >
    </div>
    <div class="info">
      <div class="name">{{ mvListItems.name }}</div>
      <div class="publish-time">{{ mvListItems.publishTime }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class MvListItems extends Vue {
  @Prop({
    default() {
      return {}
    }
  })
  mvListItems!: object
}
</script>

<style lang="less" scoped>
.mv-list-items {
  display: flex;
  align-items: center;
  padding: 6px 0;
  .mv-img {
    width: 144px;
    height: 70px;
    position: relative;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
    .play-count {
      position: absolute;
      top: 3px;
      right: 5px;
      color: white;
      font-size: 12px;
    }
  }
  .info {
    flex: 1;
    padding-left: 8px;
    .publish-time {
      font-size: 12px;
      padding-top: 3px;
      color: #999;
    }
  }
}
</style>
