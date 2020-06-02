<template>
  <div>
    <scroll class="singer-detail-scroll" ref="singerDetailScroll" :probeType="3" @scroll="scroll">
      <div class="singer-detail">
        <detail-head ref="detailHead" :singerHeadInfo="singerHeadInfo" />
        <detail-tab-bar
          v-show="isShowTabbar"
          ref="detailTabbar"
          class="singer-detail-tabbar1"
          :tabbarInfo="tabbarList"
          :isTopRadian="true"
          @changeTabbar="changeTabbar"
        ></detail-tab-bar>

        <detail-home v-show="0 === tabbarContentIndex" :singleList="hotSongs" />
        <detail-album
          v-show="1 === tabbarContentIndex"
          :albumList="hotAlbumsData"
          :isMore="hotAlbumsMore"
        />
        <detail-mv v-show="2 === tabbarContentIndex" :mvList="mvsData" />
      </div>
      <!-- 不让scroll将以下组件滚动 -->
      <topbar class="singer-detail-topbar" ref="detailTopbar">
        <div slot="left">
          <span @click="back" class="fa-arrow-left back"></span>
        </div>
        <div v-show="!isShowName" slot="center">
          <h3 class="title">{{ singerHeadInfo.name }}</h3>
        </div>
        <div slot="right">
          <span class="fa-ellipsis-v report"></span>
        </div>
      </topbar>
      <detail-tab-bar
        v-show="!isShowTabbar"
        ref="detailTabbar2"
        class="singer-detail-tabbar2"
        :tabbarInfo="tabbarList"
        :isTopRadian="true"
        @changeTabbar="changeTabbar"
      ></detail-tab-bar>
    </scroll>
    <songlist-operation ref="songOperation"></songlist-operation>
  </div>
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
import songlistOperation from "@/components/content/songlist-operation/index.vue";
import { SongsInfoClass } from "@/conf/songsInfo";
import {
  getSingerDetail,
  ISingerHeadInfo,
  getSingerAlbum,
  getSingerMv
} from "@/service/singer";

@Component({
  name: "singerDetail",
  components: {
    scroll,
    topbar,
    detailHead,
    detailTabBar,
    detailHome,
    detailAlbum,
    detailMv,
    songlistOperation
  }
})
export default class SingerDetail extends Vue {
  private singerHeadInfo: ISingerHeadInfo = {};
  private tabbarContentIndex: number = 0; // 用于控制显示tabbar 主页、专辑、Mv 的内容
  private hotSongs: object[] = [];
  private hotAlbumsData: object[] = [];
  private hotAlbumsMore: boolean = false;
  private mvsData: object[] = [];
  private scrollY: number = 0;
  private isShowName: boolean = true;
  private isShowTabbar: boolean = true;
  private activeHeight: number = -1; // 计算到 用于显示顶部导航栏中的名字 的高度
  private opacity: number = 1; // 用于设置detailHead组件中的文字的透明度

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
    // 子路由所带来的问题：在singerDetail组件中singer组件需要被隐藏
    (<HTMLElement>document.getElementById("singer-list-view")).classList.add(
      "none"
    );

    (<any>this).$bus.$on("openOperation", (val: any) => {
      (<any>this).$refs.songOperation
        ? ((<any>this).$refs.songOperation.operationShow = true)
        : null;
      (<any>this).$refs.songOperation
        ? ((<any>this).$refs.songOperation.curSongInfo = val)
        : null;
    });
  }
  // 歌手组件被缓存下来了，当从搜索结果中的歌手点击过来时，需要在activated组件被激活时去请求对应的数据
  activated() {
    this.getSingerDateilData(this.id);
    this.getSingerAlbumData(this.id);
    this.getSingerMvData(this.id);
  }
  deactivated() {
    this.singerHeadInfo = {};
    this.hotSongs = [];
    this.hotAlbumsData = [];
    this.hotAlbumsMore = false;
    this.mvsData = [];
  }
  beforeDestroy() {
    (<any>this).$bus.$emit("leaveSingerDetail");
    (<any>this).$bus.$off("openOperation");
  }

  async getSingerDateilData(id: number) {
    let res = await getSingerDetail(id);
    if (res.code === 200) {
      this.singerHeadInfo = res.artist;
      let arr = [];
      for (const item of res.hotSongs) {
        arr.push(new SongsInfoClass(item));
      }
      this.hotSongs = arr;
    }
  }
  async getSingerAlbumData(id: number, page?: number) {
    let res = await getSingerAlbum(id, page);
    if (res.code === 200) {
      this.hotAlbumsData = res.hotAlbums;
      this.hotAlbumsMore = res.more;
    }
  }
  async getSingerMvData(id: number) {
    let res = await getSingerMv(id);
    if (res.code === 200) {
      this.mvsData = res;
    }
  }

  back() {
    this.$router.go(-1);
  }
  scroll(position: IPosition) {
    this.scrollY = -position.y;

    // 禁止下拉
    if (this.scrollY <= 0) {
      (<any>this.$refs.singerDetailScroll).scrollTo(0, 0, 0);
    }
    // 显示 TopBar 中的 名字,并同步 Tabbar
    if (this.scrollY >= this.activeHeight) {
      this.isShowName = false;
      this.isShowTabbar = false;
      (<any>this.$refs.detailTopbar).$el.style.background = `rgb(0,0,0)`;
    } else {
      this.isShowName = true;
      this.isShowTabbar = true;
      (<any>this.$refs.detailTopbar).$el.style.background = `rgba(0,0,0,0)`;
      //设置detailHead组件中的文字缓慢透明
      this.opacity = 1 - this.scrollY / this.activeHeight;
      (<any>this.$refs.detailHead).$el.lastChild.style.opacity = this.opacity;
    }
  }
  // 使 tabbar 同步
  changeTabbar(index: number) {
    (<any>this.$refs.detailTabbar).currentIndex = (<any>(
      this.$refs.detailTabbar2
    )).currentIndex = this.tabbarContentIndex = index;
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
  .singer-detail {
    background-color: #f2f2f2;
    .singer-detail-tabbar1 {
      position: relative;
      z-index: 1003;
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
  .singer-detail-tabbar2 {
    position: fixed;
    left: 0;
    right: 0;
    top: 38px;
    z-index: 1003;
  }
}
</style>
