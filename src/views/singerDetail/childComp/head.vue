<template>
  <div class="singer-detail-head" :style="bgImg">
    <topbar class="singer-detail-topbar">
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="right">
        <span class="fa-ellipsis-v report"></span>
      </div>
    </topbar>
    <div class="info">
      <h3 class="name">{{ singerHeadInfo.name }}</h3>
      <p class="desc">{{ singerHeadInfo.briefDesc }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import topbar from "components/common/navbar/navbar.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import { ISingerHeadInfo } from "@/service/singer";

@Component({
  components: {
    topbar
  }
})
export default class SingerDetailHead extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  singerHeadInfo!: ISingerHeadInfo;

  back() {
    this.$router.go(-1);
  }

  get bgImg() {
    return {
      backgroundImage: `url(${this.singerHeadInfo &&
        this.singerHeadInfo.img1v1Url})`
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
  height: 250px;
  background-size: 100%;
  .singer-detail-topbar {
    position: relative;
    z-index: 1001;
    .back,
    .report {
      font-size: 20px;
      color: white;
    }
  }
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
