<template>
  <div class="musicList">
    <topbar />
    <bg-info :info="baseInfo" />
    <songslist :songlist="songList" />
  </div>
</template>

<script lang='ts'>
import {
  albumContent,
  AlbumBaseInfo,
  songsDetail,
  SongsBaseInfo
} from "@/service/musiclist";
import topbar from "./childComp/head.vue";
import bgInfo from "./childComp/bg-info.vue";
import songslist from "./childComp/songlist.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    topbar,
    bgInfo,
    songslist
  }
})
export default class MusicList extends Vue {
  private baseInfo = {};
  private songList: object[] = [];

  get id() {
    return parseInt(this.$route.params.id);
  }

  created() {
    if (this.$route.path.match(/\/album\//)) {
      this.getAlbumContent();
    } else if (this.$route.path.match(/\/songsheet\//)) {
      this.getSongsDetail();
    }
  }

  async getAlbumContent() {
    let res = await albumContent(this.id);
    if (res.code === 200) {
      this.baseInfo = new AlbumBaseInfo(res.album);
      this.songList = res.songs;
    }
  }
  async getSongsDetail() {
    let res = await songsDetail(this.id);
    if (res.code === 200) {
      this.baseInfo = new SongsBaseInfo(res.playlist);
      this.songList = res.playlist.tracks
    }
  }
}
</script>
<style scoped lang='less'>
</style>