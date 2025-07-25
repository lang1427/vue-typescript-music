<template>
  <div>
    <scroll
      class="video-scroll"
      ref="videoScroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <div>
        <div class="video" v-if="videoList.length != 0">
          <div
            class="list-items"
            v-for="(item, index) of videoList"
            :key="index"
          >
            <div class="items-img">
              <img v-lazy="item.coverUrl" @load="imgLoad" />
            </div>
            <div class="info">
              <p class="title">{{ item.title }}</p>
              <p class="desc">
                {{ item.durationms }} by {{ item.creator[0].userName }}
              </p>
            </div>
          </div>
        </div>
        <loading v-show="$store.state.loadingShow" />
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
import scroll from "@/components/common/scroll/scroll.vue";
import { loadingMixin } from "@/utils/mixin";
interface IVideo {
  title: string;
  coverUrl: string;
  durationms: string;
  creator: {
    userName: string;
  }[];
}
export default {
  components: {
    scroll,
  },
  mixins: [loadingMixin],
  props: {
    videoList: {
      type: Array as () => IVideo[],
      default: () => [],
    },
  },

  mounted() {
    this.$bus.on("finishPullUp", () => {
      (<typeof scroll>this.$refs.videoScroll).finishPullUp();
      (<typeof scroll>this.$refs.videoScroll).refresh();
    });
  },
  destroyed() {
    this.$bus.off("finishPullUp");
  },

  methods: {
    imgLoad() {
      (<typeof scroll>this.$refs.videoScroll).refresh();
    },

    pullingUp() {
      this.$emit("pullingUp", 2);
    },
  },
};
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
