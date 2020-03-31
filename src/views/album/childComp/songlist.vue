<template>
  <div class="song-list" v-if="songlist.length!=0">
    <div class="play">
      <span class="fa-play-circle-o ico"></span>
      <span class="text">播放全部</span>
      <span class="count">{{ totalCount }}</span>
    </div>
    <div class="list">
      <div
        v-for="(item,index) of songlist"
        :key="item.id"
        class="list-item"
        @click="play(item.id,index)"
      >
        <div class="index">{{ index+1 }}</div>
        <div class="name">
          <p>{{ item.name }}</p>
          <p class="singers">
            <span v-for="arlist of item.ar" :key="arlist.id">{{ arlist.name }}</span>
          </p>
        </div>
        <div class="operation">
          <span class="fa-ellipsis-v"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { PlayList } from "@/conf/playlist";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class SongList extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  songlist!: object[];

  get totalCount() {
    return `(共${this.songlist.length}首)`;
  }

  created() {}
  play(id: number, index: number) {
    (<any>this).$bus.$emit("musicID", id, index);
    let playArr: object[] = [];
    this.songlist.forEach((item: any) => {
      playArr.push(new PlayList(item));
    });
    this.$store.dispatch("changePlayList", playArr);
  }
}
</script>
<style scoped lang='less'>
.song-list {
  margin-top: -45px;
  background: white;
  border-radius: 15px 15px;
  .play {
    height: 50px;
    line-height: 50px;
    .ico {
      color: #4d4d4d;
      font-size: 25px;
      width: 50px;
      height: 50px;
      display: inline-block;
      text-align: center;
    }
    .text {
      font-size: 18px;
      height: 50px;
    }
    .count {
      color: #999;
    }
  }
  .list {
    .list-item {
      display: flex;
      height: 50px;
      align-items: center;
      text-align: center;
      .index {
        width: 50px;
        color: #999;
      }
      .name {
        flex: 1;
        text-align: left;
        .singers {
          span {
            color: #999;
            font-size: 12px;
          }
        }
      }
      .operation {
        width: 50px;
        span {
          color: #999;
        }
      }
    }
  }
}
</style>