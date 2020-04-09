<template>
  <div class="recmend-songlist">
    <div class="clearfix">
      <span class="fl title">推荐歌单</span>
      <span class="fr more">歌单广场</span>
    </div>
    <grid-view :cols="3" :v-margin="8">
      <div
        v-for="item of songlist"
        :key="item.id"
        class="song-list-item"
        @click="goSongSheet(item.id)"
      >
        <span class="play-count">
          <i class="fa-play"></i>
          {{ item.playCount | finalPlayCount }}
        </span>
        <img v-lazy="item.picUrl" alt />
        <p class="name">{{ item.name }}</p>
      </div>
    </grid-view>
  </div>
</template>

<script lang='ts'>
import gridView from "components/common/gridview/grid-view.vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    gridView
  }
})
export default class RecmendSonglist extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  private songlist!: object[];
  goSongSheet(id: number) {
    this.$router.push("/songsheet/" + id);
  }
}
</script>

<style lang="less" scoped>
.recmend-songlist {
  .clearfix {
    padding: 0 10px;
    .title {
      font-size: 16px;
      font-weight: 700;
    }
    .more {
      border-radius: 12px;
      border: 1px solid #ccc;
      padding: 3px;
      font-size: 12px;
    }
  }
  .song-list-item {
    position: relative;
    .play-count {
      position: absolute;
      top: 2px;
      right: 2px;
      color: #eee;
      font-size: 12px;
      .fa-play {
        color: #fff;
        font-size: 12px;
      }
    }
    img {
      width: 100%;
    }
    .name {
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>