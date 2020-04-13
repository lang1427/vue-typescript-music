<template>
  <div class="find">
    <find-swiper :bannerlist="bannerList" />
    <recommend />
    <recmend-songlist :songlist="songList" />
    <new-album :newalbumlist="albums" />
    <div style="margin-top:30px;padding:20px;text-align:center;background:rgb(55, 61, 65)">
      <div style="color:#999;font-size:12px">© 2019-2021 kanglang.xyz 版权所有</div>
      <a  style="padding-top:3px;color:#999;font-size:12px;text-decoration:none;" href="http://www.beian.miit.gov.cn" target="_blank"> 赣ICP备19003694号-1</a>
    </div>
  </div>
</template>

<script lang="ts">
import findSwiper from "./childComp/find-swiper.vue";
import recommend from "./childComp/recommend.vue";
import recmendSonglist from "./childComp/recmend-songlist.vue";
import newAlbum from "./childComp/new-album.vue";
import {
  getBanner,
  bannerData,
  getSonglist,
  getNewAlbum
} from "@/service/find";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    findSwiper,
    recommend,
    recmendSonglist,
    newAlbum
  }
})
export default class Find extends Vue {
  /**data */
  private bannerList: object[] = [];
  private songList: object[] = [];
  private albums: object[] = [];

  /** 生命周期 */
  created() {
    this.getBannerData();
    this.getSonglistData();
    this.getNewAlbumData();
  }

  /** methods */
  async getBannerData() {
    let res = await getBanner(2);
    if (res.code === 200) {
      let arr: object[] = [];
      res.banners.forEach((item: object, i: string) => {
        arr.push(new bannerData(item));
      });
      this.bannerList = arr;
    }
  }

  async getSonglistData() {
    let res = await getSonglist(6);
    if (res.code === 200) {
      this.songList = res.result;
    }
  }

  async getNewAlbumData() {
    let res = await getNewAlbum();
    if (res.code === 200) {
      this.albums = res.albums;
    }
  }
}
</script>

<style lang="less" scoped>
.find {
}
</style>
