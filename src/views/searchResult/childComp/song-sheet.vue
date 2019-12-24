<template>
  <div>
    <scroll
      v-if="songSheetList.length!=0"
      class="song-sheet-scroll"
      ref="songsheetScroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <div class="song-sheet">
        <div class="list-items" v-for="(item,index) of songSheetList" :key="index">
          <div class="items-img">
            <img :src="item.coverImgUrl" @load="imgLoad" />
          </div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div
              class="desc"
            >{{ item.trackCount }}首 by {{ item.creator.nickname }} 播放{{ item.playCount | finalPlayCount }}次</div>
          </div>
        </div>
      </div>
    </scroll>
    <loading v-else />
  </div>
</template>

<script lang='ts'>
import scroll from "components/common/scroll/scroll.vue";
import { loadingMixin } from "@/utils/mixin";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    scroll
  },
  mixins: [loadingMixin]
})
export default class SongSheet extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  songSheetList!: object[];

  imgLoad() {
    (this.$refs.songsheetScroll as any).refresh();
  }

  pullingUp() {
    this.$emit("pullingUp", 5);
    setTimeout(() => {
      (<any>this.$refs.songsheetScroll).finishPullUp();
    }, 200);
  }
}
</script>

<style lang="less" scoped>
.song-sheet-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 0;
  overflow: hidden;
  .song-sheet {
    padding: 10px 10px 0;
    .list-items {
      padding: 5px 0;
      display: flex;
      align-items: center;
      .items-img {
        width: 60px;
        img {
          width: 100%;
          display: block;
        }
      }
      .info {
        flex: 1;
        margin-left: 10px;
        .name {
        }
        .desc {
          padding-top: 3px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>