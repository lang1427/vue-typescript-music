<template>
  <popup :popupShow="playerListShow" bgcolor="#6a936a" @hide="playerListShow = false">
    <div class="player-list">
      <div class="current-play">
        当前播放
        <span class="length">{{listLength}}</span>
      </div>
      <div class="operation">
        <div class="mode" @click="changeMode">
          <div class="ico" :class="modeICON"></div>
          <div class="title">{{ modeName[this.$store.state.playMode] }}</div>
        </div>
        <div class="star">
          <span @click="starAll">
            <span class="fa-plus-square-o"></span> 收藏全部
          </span>
        </div>
        <div class="fa-trash remove" @click="remove(-1)"></div>
      </div>
      <div class="list">
        <ul class="list-item">
          <li
            class="items"
            :class="[item.id===$store.getters.playMusicID?'active':'']"
            v-for="(item,index) of playerList"
            :key="item.id"
            @click="play(index)"
          >
            <span class="name">
              <img
                class="playing-ico"
                v-if="item.id===$store.getters.playMusicID"
                :src="playingImg"
              />
              {{ item.name }}
            </span>
            <span class="fa-remove" @click.stop="remove(index)"></span>
          </li>
        </ul>
      </div>
    </div>
    <star-dialog :dialogShow="starShow" @hide="starShow=false">
      <div class="star-box">
        <h3>收藏到歌单</h3>
        <ul class="star-songsheet">
          <li class="new-create" @click="createSongShow=true">
            <span class="ico">+</span>
            <span class="name">新建歌单</span>
          </li>
          <li
            class="songsheet-list-items"
            v-for="item of userSongsheetList"
            :key="item.id"
            @click="SetSongsheetOperation('add',item.id)"
          >
            <span class="ico">
              <img :src="item.imgUrl" alt />
            </span>
            <span class="info">
              <span class="name">{{ item.name }}</span>
              <span class="count">{{ item.count }}首</span>
            </span>
          </li>
        </ul>
      </div>
    </star-dialog>
    <create-song-dialog
      :createSongShow="createSongShow"
      @close="createSongShow=false"
      @complete="createSongComplete"
    />
    <kl-confirm
      :isShow="confirmShow"
      content="确定清空所有播放列表吗？"
      @cancel="confirmShow=false"
      @confirm="confirmRemove"
    ></kl-confirm>
    <star-message message="收藏成功" :isShow="messageShow" />
  </popup>
</template>

<script lang='ts'>
import popup from "@/components/common/bottomPopup/bottom-popup.vue";
import klConfirm from "@/components/common/kl-confirm/kl-confirm.vue";
import starDialog from "@/components/common/kl-dialog/kl-dialog.vue";
import createSongDialog from "@/components/content/create-song-dialog/index.vue";
import starMessage from "@/components/common/message/message.vue";
import { getCookie } from "@/utils/cookie";
import { playMixin, playModeMixin, userSongsManageMixin } from "@/utils/mixin";
import { createSongSheet, songsheetOperation } from "@/service/songsheet";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    popup,
    klConfirm,
    starDialog,
    createSongDialog,
    starMessage
  },
  mixins: [playMixin, playModeMixin, userSongsManageMixin]
})
export default class PlayerList extends Vue {
  private playerListShow: boolean = false; // 原变量名isShow在playModeMixin中冲突，导致此组件中切换模式之后会自动关闭弹出层
  private starShow: boolean = false;
  private createSongShow: boolean = false;
  private confirmShow: boolean = false;
  private messageShow: boolean = false;

  get playerList() {
    return this.$store.state.playList;
  }
  get listLength() {
    return `(${this.$store.state.playList.length})`;
  }
  get playingImg() {
    return require("@/components/common/loading/loading.gif");
  }

  created() {}
  starAll() {
    (this as any).getUserSongsheet();
    this.starShow = true;
  }
  confirmRemove() {
    this.$store.dispatch("removePlayList", -1);
  }
  remove(val: number) {
    if (val === -1) {
      this.confirmShow = true;
      return false;
    }
    this.$store.dispatch("removePlayList", val);
  }
  createSongComplete() {
    this.starShow = false;
    this.messageShow = true;
    window.setTimeout(() => {
      this.messageShow = false;
    }, 500);
  }
}
</script>
<style scoped lang='less'>
.player-list {
  padding: 10px;
  .current-play {
    padding: 5px 0;
    font-size: 16px;
    color: white;
    .length {
      color: rgb(220, 220, 220);
    }
  }
  .operation {
    display: flex;
    height: 25px;
    align-items: center;
    margin-bottom: 5px;
    .mode {
      width: 100px;
      display: flex;
      align-items: center;
      .ico {
        height: 25px;
        width: 30px;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center center;
        &.listloop {
          background-image: url(../image/listloop.png);
        }
        &.singleloop {
          background-image: url(../image/singleloop.png);
        }
        &.random {
          background-image: url(../image/random.png);
        }
      }
      .title {
        font-size: 12px;
        color: white;
      }
    }
    .star {
      flex: 1;
      text-align: right;
      span {
        color: white;
      }
    }
    .remove {
      margin-left: 20px;
      width: 40px;
      text-align: center;
      color: white;
    }
  }
  .list {
    height: 380px;
    overflow: auto;
    .list-item {
      height: 100%;
      .items {
        height: 35px;
        line-height: 35px;
        display: flex;
        overflow-x: hidden;
        &.active {
          .name {
            color: @klColor;
          }
        }
        .name {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .playing-ico {
            height: 50%;
            vertical-align: middle;
          }
        }
        .fa-remove {
          width: 40px;
          text-align: center;
          color: white;
        }
      }
    }
  }
}
.star-box {
  padding: 5px;
  width: 260px;
  .star-songsheet {
    padding-top: 10px;
    height: 400px;
    overflow-y: auto;
    // 隐藏滚动条
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
      /** Chrome和Safari浏览器 */
      display: none;
    }
    .new-create {
      display: flex;
      height: 40px;
      align-items: center;
      .ico {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: @klColor;
        font-size: 22px;
        background-color: #dedede;
      }
      .name {
        flex: 1;
        padding-left: 10px;
      }
    }
    .songsheet-list-items {
      display: flex;
      align-items: center;
      padding-top: 10px;
      .ico {
        width: 40px;
        height: 40px;
        img {
          display: block;
          width: 100%;
        }
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        .count {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
.create-song-box {
  padding: 10px;
  .input-box {
    display: flex;
    width: 200px;
    flex-direction: column;
    margin: 10px 0;
    .input {
      width: 100%;
      border: none;
      outline: none;
      text-indent: 0.5em;
      border-bottom: 1px solid #ccc;
    }
    .limit {
      text-align: right;
      font-size: 12px;
      color: #999;
    }
  }
  .operation {
    display: flex;
    justify-content: flex-end;
    .btn {
      color: @klColor;
      width: 40px;
      text-align: center;
    }
  }
}
</style>