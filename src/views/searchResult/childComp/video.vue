<template>
  <div>
    <scroll v-if="videoList.length!=0" class="video-scroll">
      <div class="video">
        <div class="list-items" v-for="item of videoList" :key="item.vid">
          <div class="items-img">
            <img :src="item.coverUrl" alt />
          </div>
          <div class="info">
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.durationms }} by {{ item.creator[0].userName }}</p>
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
export default class Video extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  videoList!: object[];
}
</script>

<style lang="less" scoped>
.video-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 0px;
  overflow: hidden;
  .video {
    padding: 0 10px;
    .list-items {
      display: flex;
      padding: 5px 0;
      align-items: center;
      .items-img {
        width: 100px;
        img {
          width: 100%;
        }
      }
      .info {
        flex: 1;
        padding-left: 10px;
        overflow: hidden;
        .title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .desc {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
</style>