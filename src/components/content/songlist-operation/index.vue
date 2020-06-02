<template>
  <popup class="songlist-operation" :popupShow="operationShow" @hide="operationShow = false">
    <div class="operation-box">
      <div class="info">
        <div class="avatar">
          <img :src="curSongInfo.imgUrl" alt />
        </div>
        <div class="name">
          <p>{{ curSongInfo.songsName }}</p>
          <p class="singer-name">{{ curSongInfo.singerName }}</p>
        </div>
      </div>
      <ul class="operation-list">
        <li @click="nextPlay(curSongInfo)">
          <span class="fa-play-circle-o ico"></span>
          <span>下一首播放</span>
        </li>
        <li @click="goComment(curSongInfo.songsId)">
          <span class="fa-commenting-o ico"></span>
          <span>评论</span>
        </li>
      </ul>
    </div>
  </popup>
</template>

<script lang='ts'>
import popup from "@/components/common/bottomPopup/bottom-popup.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {
    popup
  }
})
export default class SonglistOperation extends Vue {
  private operationShow: boolean = false;
  private curSongInfo: object = {}; // 当前歌曲信息 需要从外界赋值
  created() {}

  get isAlbumPage() {
    return new RegExp(/^\/album\/((?:[^\/]+?))(?:\/(?=$))?$/i).test(
      this.$route.path
    );
  }
  nextPlay(playInfo: any) {
    let obj = {
      id: playInfo.songsId,
      imgURL: playInfo.imgUrl,
      name: playInfo.songsName
    };
    this.$store.commit("insertPlaylist", obj);
    this.operationShow = false;
  }
  goComment(songsId: string) {
    this.$router.push({
      path: "/comment/songs",
      query: {
        id: songsId
      }
    });
  }
}
</script>
<style scoped lang='less'>
.songlist-operation {
  .operation-box {
    padding: 15px 10px 0;
    .info {
      display: flex;
      height: 60px;
      align-items: center;
      .avatar {
        width: 60px;
        height: 100%;
        img {
          padding: 5px;
          width: 100%;
          height: 100%;
        }
      }
      .name {
        padding-left: 8px;
        flex: 1;
        .singer-name {
          font-size: 12px;
          color: #999;
        }
      }
    }
    .operation-list {
      li {
        line-height: 35px;
        position: relative;
        &:last-of-type {
          &::after {
            background: transparent;
          }
        }
        &::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          transform: scaleY(0.5);
          background: #ccc;
        }
        span {
          &.ico {
            color: #666;
            padding-right: 6px;
          }
        }
      }
    }
  }
}
</style>