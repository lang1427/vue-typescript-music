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
          <li class="new-create">
            <span class="ico">+</span>
            <span class="name">新建歌单</span>
          </li>
          <li class="songsheet-list-items"></li>
        </ul>
      </div>
    </star-dialog>
    <kl-confirm
      :isShow="confirmShow"
      content="确定清空所有播放列表吗？"
      @cancel="confirmShow=false"
      @confirm="confirmRemove"
    ></kl-confirm>
  </popup>
</template>

<script lang='ts'>
import popup from "@/components/common/bottomPopup/bottom-popup.vue";
import klConfirm from "@/components/common/kl-confirm/kl-confirm.vue";
import starDialog from "@/components/common/kl-dialog/kl-dialog.vue";
import { playMixin, playModeMixin } from "@/utils/mixin";
import {userSongsheet} from '@/service/songsheet'
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    popup,
    klConfirm,
    starDialog
  },
  mixins: [playMixin, playModeMixin]
})
export default class PlayerList extends Vue {
  private playerListShow: boolean = false; // 原变量名isShow在playModeMixin中冲突，导致此组件中切换模式之后会自动关闭弹出层
  private starShow: boolean = false;
  private confirmShow: boolean = false;

  get userID(){
    return this.$store.state.account && this.$store.state.account.account.id
  }

  get playerList() {
    return this.$store.state.playList;
  }
  get listLength() {
    return `(${this.$store.state.playList.length})`;
  }
  get playingImg() {
    return require("@/components/common/loading/loading.gif");
  }

  async getUserSongsheet(){
    let res = await userSongsheet(this.userID)
    console.log(res)
  }

  created() {
  }
  starAll(){
    this.starShow = true
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
    .new-create {
      display: flex;
      height: 40px;
      align-items: center;
      .ico{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: @klColor;
        font-size: 22px;
        background-color: #dedede;
      }
      .name{
        flex:1;
        padding-left: 10px;
      }
    }
    .songsheet-list-items {
    }
  }
}
</style>