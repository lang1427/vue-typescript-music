<template>
  <div class="musicList">
    <topbar :operation="isUserSong" />
    <bg-info :info="baseInfo" />
    <songslist :songlist="songList" />
  </div>
</template>

<script lang='ts'>
import { albumContent, AlbumBaseInfo } from "@/service/musiclist";
import { IUserSongList, songsDetail, SongsBaseInfo } from "@/service/songsheet";
import { topList,RankBaseInfo } from "@/service/rankinglist";
import { userSongsManageMixin } from "@/utils/mixin";
import { SongsInfoClass } from "@/conf/songsInfo";
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
    } else if (this.$route.path.match(/\/toplist\//)) {
      this.getTopList(this.id);
    }
  }

  async getAlbumContent() {
    let res = await albumContent(this.id);
    if (res.code === 200) {
      this.baseInfo = new AlbumBaseInfo(res.album);
      let arr = [];
      for (const item of res.songs) {
        arr.push(new SongsInfoClass(item));
      }
      this.songList = arr;
    }
  }
  async getSongsDetail() {
    let res = await songsDetail(this.id);
    if (res.code === 200) {
      this.baseInfo = new SongsBaseInfo(res.playlist);
      let arr = [];
      for (const item of res.playlist.tracks) {
        arr.push(new SongsInfoClass(item));
      }
      this.songList = arr;
    }
  }
  async getTopList(idx: number) {
    let res = await topList(idx);
    if (res.code === 200) {
     this.baseInfo = new RankBaseInfo(res.playlist)
      let arr = [];
      for (const item of res.playlist.tracks) {
        arr.push(new SongsInfoClass(item));
      }
      this.songList = arr;
    }
  }
}
</script>
<style scoped lang='less'>
</style>