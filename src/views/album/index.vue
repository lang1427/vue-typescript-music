<template>
  <div class="album-page">
    <topbar />
    <bg-info :info="baseInfo"/>
    <songslist :songlist="songList"/>
  </div>
</template>

<script lang='ts'>
import { albumContent, AlbumBaseInfo } from "@/service/album";
import topbar from "./childComp/head.vue";
import bgInfo from "./childComp/bg-info.vue";
import songslist from './childComp/songlist.vue'
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    topbar,
    bgInfo,
    songslist
  }
})
export default class AlbumPage extends Vue {
  private baseInfo = {};
  private songList: object[] = [];

  get id() {
    return parseInt(this.$route.params.id);
  }

  created() {
    this.getAlbumContent();
  }

  async getAlbumContent() {
    let res = await albumContent(this.id);
    if (res.code === 200) {
      this.baseInfo = new AlbumBaseInfo(res.album);
      this.songList = res.songs;
    }
  }
}
</script>
<style scoped lang='less'>
.album-page {
}
</style>