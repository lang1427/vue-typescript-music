<template>
  <transition name="fade-full-player">
    <div class="full-player">
      <top-bar class="topbar">
        <div slot="left" @click="back">
          <span class="fa-arrow-left back"></span>
        </div>
        <div slot="center">
          <p style="color:white;">{{ $store.getters.playMusicName }}</p>
        </div>
      </top-bar>
      <div class="CD-lyrics">
        <div class="cd">
          <img :src="$store.getters.playMusicImg" alt />
        </div>
        <div class="lyrics"></div>
      </div>
      <div class="other-operation">
        <div class="fa-heart-o like list-items"></div>
        <div class="fa-arrow-circle-o-down download list-items"></div>
        <div class="fa-commenting-o comment list-items"></div>
        <div class="fa-ellipsis-v info list-items"></div>
      </div>
      <progress-bar
        style="bottom:70px;"
        :progress="percent"
        @changePercent="changePercent"
        @endPercent="endPercent"
      >
        <div class="time" slot="time-current">{{ formatTime(currentTime) }}</div>
        <div class="time" slot="time-total">{{ formatTime(totalTime) }}</div>
      </progress-bar>
      <div class="play-operation">
        <div @click="changeMode" :class="modeICON" class="play-mode list-items"></div>
        <div @click="prev" class="fa-step-backward prev list-items"></div>
        <div
          @click="playStatus"
          :class="[playStatu?'fa-stop-circle-o':'fa-play-circle-o','status list-items']"
        ></div>
        <div @click="next" class="fa-step-forward next list-items"></div>
        <div class="fa-outdent songs-list list-items"></div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import topBar from "@/components/common/navbar/navbar.vue";
import progressBar from "@/components/content/progress-bar/progress-bar.vue";
import { EPlayMode } from "@/store/interface";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {
    topBar,
    progressBar
  }
})
export default class FullPlayer extends Vue {
  @Prop({ default: 0 }) percent!: number;
  @Prop({ default: false }) playStatu!: boolean;
  @Prop({ default: 0 }) totalTime!: number;
  @Prop({ default: 0 }) currentTime!: number;

  get modeICON() {
    let mode = "listloop";
    switch (this.$store.state.playMode) {
      case 0:
        mode = "listloop";
        break;
      case 1:
        mode = "singleloop";
        break;
      case 2:
        mode = "random";
        break;
    }
    return mode;
  }

  created() {}
  back() {
    this.$emit("toggle", true);
  }
  next() {
    this.$emit("next");
  }
  prev() {
    this.$emit("prev");
  }
  changeMode() {
    switch (this.$store.state.playMode) {
      case 0:
        this.$store.commit("changePlayMode", EPlayMode.singleLoop);
        break;
      case 1:
        this.$store.commit("changePlayMode", EPlayMode.random);
        break;
      case 2:
        this.$store.commit("changePlayMode", EPlayMode.listLoop);
        break;
    }
  }
  // 向外告知 进度被拖动，用于进度颜色的改变
  changePercent(newVal: number) {
    this.$emit("changePercent", newVal);
  }
  // 向外告知 进度拖动结束 需要设置好当前的播放时间
  endPercent(newVal: number) {
    this.$emit("endPercent", newVal);
  }
  playStatus() {
    this.$emit("playStatus", !this.playStatu);
  }
  formatTime(time: number) {
    let h = Math.max(0, Math.floor(time / 3600));
    let m = Math.floor((time % 3600) / 60);
    let s = Math.max(0, Math.floor(time % 60));
    if (h === 0) {
      return `${m.toString().padStart(2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
    }
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
}
</script>
<style scoped lang='less'>
.fade-full-player-enter-active,
.fade-full-player-leave-active {
  transition: all 0.3s;
}
.fade-full-player-enter,
.fade-full-player-leave-to {
  transform: translateY(100%);
}
.full-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(6, 6, 6);
  z-index: 6666;
  .topbar {
    .back {
      font-size: 20px;
      color: rgb(233, 233, 233);
    }
  }
  .CD-lyrics {
    position: absolute;
    top: 60px;
    bottom: 180px;
    left: 0;
    right: 0;
    .cd {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 270px;
        border-radius: 50%;
      }
    }
  }
  .other-operation {
    display: flex;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    bottom: 110px;
    .list-items {
      flex: 1;
      color: rgb(233, 233, 233);
      text-align: center;
      font-size: 20px;
    }
  }
  .time {
    color: #999;
    font-size: 12px;
  }
  .play-operation {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    bottom: 20px;
    .list-items {
      flex: 1;
      color: rgb(233, 233, 233);
      text-align: center;
      font-size: 25px;
      &.play-mode {
        background-repeat: no-repeat;
        background-size: 50%;
        background-position: center center;
      }
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
  }
}
</style>