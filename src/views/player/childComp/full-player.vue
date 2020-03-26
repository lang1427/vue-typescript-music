<template>
  <div class="full-player">
    <top-bar class="topbar">
      <div slot="left">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="center">
        <p>something just</p>
        <p>That Giry</p>
      </div>
    </top-bar>
    <div class="CD-lyrics">
      <div class="cd"></div>
      <div class="lyrics"></div>
    </div>
    <div class="other-operation">
      <div class="fa-heart-o like list-items"></div>
      <div class="fa-arrow-circle-o-down download list-items"></div>
      <div class="alarm list-items"></div>
      <div class="fa-commenting-o comment list-items"></div>
      <div class="fa-ellipsis-v info list-items"></div>
    </div>
    <progress-bar style="bottom:70px;"
      :progress="currentProgress"
      @changePercent="changePercent"
      @endPercent="endPercent"
    >
      <div class="time" slot="time-current">00:00</div>
      <div class="time" slot="time-total">04:30</div>
    </progress-bar>
    <div class="play-operation">
      <div class="fa-random play-mode list-items"></div>
      <div class="fa-step-backward prev list-items"></div>
      <div class="fa-play-circle-o status list-items"></div>
      <div class="fa-step-forward next list-items"></div>
      <div class="fa-outdent songs-list list-items"></div>
    </div>
  </div>
</template>

<script lang='ts'>
import topBar from "@/components/common/navbar/navbar.vue";
import progressBar from "@/components/content/progress-bar/progress-bar.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    topBar,
    progressBar
  }
})
export default class FullPlayer extends Vue {
  private currentProgress: number = 0;
  created() {}
  changePercent(newVal: number) {
    this.currentProgress = newVal;
  }
  endPercent(newVal: number) {
    this.currentProgress = newVal;
  }
}
</script>
<style scoped lang='less'>
.full-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(6,6,6);
  z-index: 6666;
  .topbar{
    .back{
       font-size: 20px;
       color: rgb(233, 233, 233);
    }
    p{
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      &:first-child{
        font-size: 14px;
        padding-top: 3px;
        color: rgb(233, 233, 233);
      }
    }
  }
  .CD-lyrics{}
  .other-operation{
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 32px;
    bottom: 100px;
    .list-items{
      flex: 1;
      color: rgb(233, 233, 233);
      text-align: center;
      font-size: 25px;
      &.alarm{
        width: 100%;
        height: 100%;
        background: url('~@/assets/images/alarm.png') center center no-repeat;
      }
    }
  }
  .time{
    color: #999;
    font-size: 12px;
  }
  .play-operation{
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    bottom: 20px;
    .list-items{
      flex: 1;
      color: rgb(233, 233, 233);
      text-align: center;
      font-size: 25px;
    }
  }
}
</style>