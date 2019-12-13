<template>
  <div class="songs">
    <div class="songs-list">
      <div class="head">
        <h3 class="title">单曲</h3>
        <div class="play-all">播放全部</div>
      </div>
      <div class="songs-list-item" v-for="item of songslist" :key="item.id">
        <div>
          <p>{{ item.name }}</p>
          <p>化成雨</p>
        </div>
        <div>
          <span>播放按钮</span>
          <span>更多操作</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Songs extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  songslist!: object[];
}
</script>

<style lang="less" scoped>
.songs {
  .songs-list {
    .head {
      .play-all {
      }
    }
    .songs-list-item {
    }
  }
}
</style>