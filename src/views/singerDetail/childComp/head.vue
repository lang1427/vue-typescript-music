<template>
  <div class="singer-detail-head" :style="bgImg">
    <div class="info">
      <h3 class="name">{{ singerHeadInfo.name }}</h3>
      <p class="desc">{{ singerHeadInfo.briefDesc }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ISingerHeadInfo } from "@/service/singer";

@Component
export default class SingerDetailHead extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  singerHeadInfo!: ISingerHeadInfo;

  get bgImg() {
    return {
      backgroundImage: `url(${this.singerHeadInfo &&
        this.singerHeadInfo.img1v1Url})`,
      height: "250px"
    };
  }
}
</script>

<style lang="less" scoped>
.singer-detail-head {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  background-size: 100%;

  span,
  p,
  h3 {
    color: white;
  }
  .info {
    position: absolute;
    bottom: 20px;
    left: 10px;
    overflow: hidden;
    .desc {
      font-size: 12px;
      // 超出3行显示省略号
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
