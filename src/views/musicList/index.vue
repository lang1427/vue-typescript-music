<template>
  <div class="musicList">
    <topbar :operation="isUserSong"/>
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
import { IUserSongList } from "@/service/songsheet";
import { userSongsManageMixin } from "@/utils/mixin";
import topbar from "./childComp/head.vue";
import bgInfo from "./childComp/bg-info.vue";
import songslist from "./childComp/songlist.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    topbar,
    bgInfo,
    songslist
  },
  mixins: [userSongsManageMixin]
})
export default class MusicList extends Vue {
  private baseInfo = {};
  private songList: object[] = [];

  get id() {
    return parseInt(this.$route.params.id);
  }

  get isUserSong() {
    if (
      this.$route.path.match(/\/songsheet\//) &&
      (this as any).userSongsheetList.length != 0
    ) {
      let res = (this as any).userSongsheetList.find((item: IUserSongList) => {
        return item.id === (this.baseInfo as SongsBaseInfo).singerId;
      });
      if (res != undefined) {
        return true;
      }
    }
    return false;
  }

  created() {
    if (this.$route.path.match(/\/album\//)) {
      this.getAlbumContent();
    } else if (this.$route.path.match(/\/songsheet\//)) {
      this.getSongsDetail();
      // 当 歌单中是自身的歌单时 则可以对自身歌单进行编辑修改； 判断是否为自身歌单 则 需要获取用户歌单信息 对 歌单id进行find对比 存在相等时 则为自身歌单
      (this as any).getUserSongsheet();
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
      this.songList = res.playlist.tracks;
    }
  }
}
</script>
<style scoped lang='less'>
</style>