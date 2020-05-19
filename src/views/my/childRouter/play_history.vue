<template>
  <div class="play-history">
    <head-bar class="head-bar">
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="center">{{ title }}</div>
    </head-bar>
    <scroll-bar class="scroll-wrapper" ref="playHistoryScroll">
      <div class="scroll-content">
        <div class="list" v-if="playHistoryList.length!=0">
          <ul>
            <li v-for="(item,index) of playHistoryList" :key="item.id" @click="playHistoryMusic(index)">
              <span class="index">{{ index+1 }}</span>
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </scroll-bar>
  </div>
</template>

<script lang='ts'>
import scrollBar from "@/components/common/scroll/scroll.vue";
import headBar from "@/components/common/navbar/navbar.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    scrollBar,
    headBar
  }
})
export default class PlayHistory extends Vue {
  created() {}
  mounted() {
    if (this.$store.getters.playListLength != 0) {
      (<any>this).$refs.playHistoryScroll.$el.style.bottom = "50px";
    }
  }
  updated() {
    if (this.$store.getters.playListLength != 0) {
      (<any>this).$refs.playHistoryScroll.$el.style.bottom = "50px";
    }
  }

  get title() {
    return `最近播放(${this.$store.getters.playHistoryLength})`;
  }
  get playHistoryList() {
    return this.$store.state.playHistory;
  }

  back() {
    this.$router.back();
  }
  playHistoryMusic(index:number){
    this.$store.dispatch('changePlayList',this.$store.state.playHistory)
    this.$store.dispatch('changeCurrentPlayIndex',index)
  }
}
</script>
<style scoped lang='less'>
.play-history {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  .head-bar {
    position: relative;
    background: white;
    z-index: 303;
    .back {
      font-size: 20px;
    }
  }

  .scroll-wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    .scroll-content {
      .list {
        ul {
          li {
            line-height: 33px;
            padding-left: 8px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            .index {
              padding-right: 8px;
              color: #999;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>