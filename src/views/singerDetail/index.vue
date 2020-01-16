<template>
  <scroll class="singer-detail-scroll" ref="singerDetailScroll" :probeType="3" @scroll="scroll">
    <div class="singer-detail">
      <detail-head ref="detailHead" :singerHeadInfo="singerHeadInfo" />
      <detail-tab-bar
        ref="detailTabbar"
        class="singer-detail-tabbar"
        :tabbarInfo="tabbarList"
        :isTopRadian="true"
      >
        <section slot="主页">
          <detail-home :singleList="hotSongs" />
        </section>
        <section slot="专辑">
          <detail-album :albumList="hotAlbums" />
        </section>
        <section slot="MV">
          <detail-mv :mvList="mvs" />
        </section>
      </detail-tab-bar>
    </div>
    <topbar class="singer-detail-topbar" ref="detailTopbar">
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div v-show="isShowName" slot="center">
        <h3 class="title">{{ singerHeadInfo.name }}</h3>
      </div>
      <div slot="right">
        <span class="fa-ellipsis-v report"></span>
      </div>
    </topbar>
  </scroll>
</template>

<script lang="ts">
interface IPosition {
  y: number;
}
import { Component, Vue } from "vue-property-decorator";
import scroll from "components/common/scroll/scroll.vue";

import topbar from "components/common/navbar/navbar.vue";
import detailHead from "./childComp/head.vue";
import detailTabBar from "components/content/tab-bar/tab-bar.vue";
import detailHome from "./childComp/home.vue";
import detailAlbum from "./childComp/album.vue";
import detailMv from "./childComp/mv.vue";

import {
  getSingerDetail,
  ISingerHeadInfo,
  getSingerAlbum,
  getSingerMv
} from "@/service/singer";

@Component({
  components: {
    scroll,
    topbar,
    detailHead,
    detailTabBar,
    detailHome,
    detailAlbum,
    detailMv
  }
})
export default class SingerDetail extends Vue {
  private singerHeadInfo: ISingerHeadInfo = {};
  private hotSongs: object[] = [];
  private hotAlbums: object[] = [];
  private mvs: object[] = [];
  private scrollY: number = 0;
  private isShowName: boolean = false;
  private activeHeight: number = -1; // 计算到 用于显示顶部导航栏中的名字 的高度

  get id() {
    return parseInt(this.$route.params.id);
  }
  get tabbarList() {
    return [
      { title: "主页" },
      { title: "专辑", size: this.singerHeadInfo.albumSize },
      { title: "MV", size: this.singerHeadInfo.mvSize }
    ];
  }

  created() {
    this.getSingerDateilData(this.id);
    this.getSingerAlbumData(this.id);
    this.getSingerMvData(this.id);
  }
  mounted() {
    this.activeHeight =
      (<any>this.$refs.detailHead).$el.offsetHeight -
      (<any>this.$refs.detailTopbar).$el.offsetHeight;

    console.log(this.$refs.detailTabbar);
  }

  async getSingerDateilData(id: number) {
    let res = await getSingerDetail(id);
    if (res.code === 200) {
      this.singerHeadInfo = res.artist;
      this.hotSongs = res.hotSongs;
    }
  }
  async getSingerAlbumData(id: number, page?: number) {
    let res = await getSingerAlbum(id, page);
    if (res.code === 200) {
      this.hotAlbums = res.hotAlbums;
    }
  }
  async getSingerMvData(id: number) {
    let res = await getSingerMv(id);
    if (res.code === 200) {
      this.mvs = res.mvs;
    }
  }

  back() {
    this.$router.go(-1);
  }
  scroll(position: IPosition) {
    this.scrollY = -position.y;
    if (this.scrollY >= this.activeHeight) {
      this.isShowName = true;
    } else {
      this.isShowName = false;
    }
  }
}
</script>

<style lang="less" scoped>
.singer-detail-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
}
.singer-detail {
  background-color: #f2f2f2;
  .singer-detail-tabbar {
    position: relative;
    z-index: 1001;
    margin-top: -15px;
  }
}
.singer-detail-topbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  .back,
  .report {
    font-size: 20px;
    color: white;
  }
  h3.title {
    color: white;
  }
}
</style>
