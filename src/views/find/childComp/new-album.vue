<template>
  <div class="new-album">
    <div class="clearfix">
      <span class="fl title">新碟</span>
      <span class="fr more">更多新碟</span>
    </div>
    <grid-view :cols="3" :v-margin="8">
      <div v-for="item of newalbumlist" :key="item.id" class="new-album-item">
        <!-- <span class="play-count">{{ item }}</span> -->
        <img :src="item.picUrl" alt />
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
export default class NewAlbum extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  private newalbumlist!: object[];
}
</script>

<style lang="less" scoped>
.new-album {
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
  .new-album-item {
    position: relative;
    .play-count {
      position: absolute;
      top: 0;
      right: 0;
      color: #eee;
      font-size: 12px;
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