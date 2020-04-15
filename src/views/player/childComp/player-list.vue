<template>
  <popup :popupShow="isShow" bgcolor="#6a936a" @hide="isShow = false">
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
            <span class="fa-plus-square-o"></span> 收藏全部
        </div>
        <div class="fa-trash remove"></div>
      </div>
      <div class="list">
        <ul class="list-item">
          <li class="items" v-for="item of playerList" :key="item.imgURL">
            {{ item.name }}
            <span class="fa-remove"></span>
          </li>
        </ul>
      </div>
    </div>
  </popup>
</template>

<script lang='ts'>
import popup from "@/components/common/bottomPopup/bottom-popup.vue";
import { playModeMixin } from "@/utils/mixin";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    popup
  },
  mixins: [playModeMixin]
})
export default class PlayerList extends Vue {

    private isShow:boolean = false

  get playerList() {
    return this.$store.state.playList;
  }
  get listLength() {
    return `(${this.$store.state.playList.length})`;
  }

  created() {}
}
</script>
<style scoped lang='less'>
.player-list {
  padding: 10px;
  .current-play {
      padding: 5px 0;
      font-size: 16px;
      color: white;
      .length{
          color: rgb(220,220,220);
      }
  }
  .operation {
    display: flex;
    height: 25px;
    align-items: center;
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
      .title{
          font-size: 12px;
          color: white;
      }
    }
    .star {
        flex: 1;
        text-align: right;
        color: white;
        .fa-plus-square-o{
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
          color: wheat;
          .fa-remove{
              float: right;
              width: 40px;
              text-align: center;
              color: white;
          }
      }
    }
  }
}
</style>