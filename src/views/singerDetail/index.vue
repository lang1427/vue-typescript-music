<template>
  <div class="singer-detail">
    <detail-head :singerHeadInfo="singerHeadInfo" />
    <detail-tab-bar class="singer-detail-tabbar" :tabbarInfo="tabbarList" :isTopRadian="true">
      <section slot="主页">
        <detail-home :singleList="hotSongs" />
      </section>
      <section slot="歌曲">
        <detail-single />
      </section>
      <section slot="专辑">
        <detail-album />
      </section>
      <section slot="视频">
        <detail-video />
      </section>
    </detail-tab-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import detailHead from "./childComp/head.vue";
import detailTabBar from "components/content/tab-bar/tab-bar.vue";
import detailHome from "./childComp/home.vue";
import detailSingle from "./childComp/single.vue";
import detailAlbum from "./childComp/album.vue";
import detailVideo from "./childComp/video.vue";

import {
  getSingerDetail,
  ISingerHeadInfo,
  getSingerDesc
} from "@/service/singer";

@Component({
  components: {
    detailHead,
    detailTabBar,
    detailHome,
    detailSingle,
    detailAlbum,
    detailVideo
  }
})
export default class SingerDetail extends Vue {
  private singerHeadInfo: ISingerHeadInfo = {};
  private hotSongs: object[] = [];

  get id() {
    return parseInt(this.$route.params.id);
  }
  get tabbarList() {
    return [
      { title: "主页" },
      { title: "歌曲", size: this.singerHeadInfo.musicSize },
      { title: "专辑", size: this.singerHeadInfo.albumSize },
      { title: "视频", size: this.singerHeadInfo.mvSize }
    ];
  }

  created() {
    this.getSingerDateilData(this.id);
    this.getSingerDescData(this.id);
  }

  async getSingerDateilData(id: number) {
    let res = await getSingerDetail(id);
    if (res.code === 200) {
      this.singerHeadInfo = res.artist;
      this.hotSongs = res.hotSongs;
    }
  }
  async getSingerDescData(id: number) {
    let res = await getSingerDesc(id);
    if (res.code === 200) {
      console.log(res);
    }
  }
}
</script>

<style lang="less" scoped>
.singer-detail {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f2f2f2;
  z-index: 1000;
  .singer-detail-tabbar {
    position: relative;
    z-index: 1001;
    margin-top: -15px;
  }
}
</style>
