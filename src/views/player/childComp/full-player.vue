<template>
  <transition name="fade-full-player">
    <div class="full-player" ref="fullPlayer">
      <notice-bar :text="$store.getters.playMusicName" color="#fff" ref="noticeBar">
        <div slot="left" @click="back">
          <span class="fa-angle-down back"></span>
        </div>
      </notice-bar>
      <div class="CD-lyrics">
        <div
          v-show="currentShow==='cd'"
          @click="currentShow='lyrics'"
          :class="[playStatu?'rotate cd':'cd']"
          @touchstart="toggleStart"
          @touchend="toggleEnd"
        >
          <img :src="$store.getters.playMusicImg" alt />
        </div>
        <!-- 歌词部分 -->
        <div class="lyrics" v-show="currentShow==='lyrics'" @click="currentShow='cd'">
          <lyric-scroll class="lyric-scroll-wrapper" ref="lyricScroll">
            <div class="lyric-content">
              <div class="current-lyric" v-if="lyricData">
                <p
                 ref="lyricLine"
                  v-for="(line,index) of lyricData.lines"
                  :key="line.key"
                  :class="{'current':$parent.currnetLineNum===index}"
                   class="text"
                >{{ line.txt }}</p>
              </div>
              <p v-if="lyricData === null" class="lyric-state">{{ lyricState }}</p>
            </div>
          </lyric-scroll>
        </div>
      </div>
      <div class="other-operation">
        <div class="fa-heart-o like list-items"></div>
        <div class="list-items">
          <a
            class="fa-arrow-circle-o-down download"
            :href="downloadUrl"
            download
            @click="downloadMusic"
          ></a>
        </div>
        <div
          @click="goCommentPage($store.getters.playMusicID)"
          class="fa-commenting-o comment list-items"
        ></div>
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
        <div @click="openPlayerList" class="fa-outdent songs-list list-items"></div>
      </div>
      <kl-message :message="modeName[this.$store.state.playMode]" :isShow="isShow" />
    </div>
  </transition>
</template>

<script lang='ts'>
import noticeBar from "@/components/common/noticeBar/notice-bar.vue";
import lyricScroll from "@/components/common/scroll/scroll.vue";
import progressBar from "@/components/content/progress-bar/progress-bar.vue";
import klMessage from "@/components/common/message/message.vue";
import { playModeMixin } from "@/utils/mixin";
import { EPlayMode } from "@/store/interface";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {
    noticeBar,
    lyricScroll,
    progressBar,
    klMessage
  },
  mixins: [playModeMixin],
  watch: {
    // 这里的操作比较有意思，因为顶部的noticeBar在隐藏的情况下是没有宽度的，需要监听到隐藏状态，当是全屏播放容器时则需要开启滚动
    "$parent.isMiniShow": {
      handler(val) {
        if (val === false) {
          (this.$refs.noticeBar as any).startScroll();
        }
      },
      immediate: true
    }
  }
})
export default class FullPlayer extends Vue {
  @Prop({ default: 0 }) percent!: number;
  @Prop({ default: false }) playStatu!: boolean;
  @Prop({ default: 0 }) totalTime!: number;
  @Prop({ default: 0 }) currentTime!: number;
  @Prop() downloadUrl!: string;
  @Prop() lyricData!: object;
  @Prop() lyricState!: string;

  private isShow: boolean = false;
  private currentShow: string = "cd";
  private touch = {
    startX: 0
  };

  created() {}
  back() {
    this.$emit("toggle", true);
  }
  toggleStart(e: TouchEvent) {
    this.touch.startX = e.touches[0].pageX;
  }
  toggleEnd(e: TouchEvent) {
    let displacement = e.changedTouches[0].pageX - this.touch.startX;
    let clientWidth = (this.$refs.fullPlayer as HTMLElement).clientWidth;
    // 滑动的位移超过1/4则进行上下首切换
    if (Math.abs(displacement) > clientWidth / 4) {
      if (displacement > 0) {
        this.$emit("prev");
      } else {
        this.$emit("next");
      }
    }
  }
  next() {
    this.$emit("next");
  }
  prev() {
    this.$emit("prev");
  }
  openPlayerList() {
    this.$emit("openPlayerlist", "open");
  }
  downloadMusic() {
    if (this.downloadUrl == null) {
      this.$toast("此首歌曲没有权限");
      return false;
    }
  }
  goCommentPage(id: string) {
    this.$router.push({
      path: "/comment/songs",
      query: { id }
    });
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
  background-image: linear-gradient(to right, #5d683d, #162717);
  z-index: 1111;

  .back {
    font-size: 20px;
    color: rgb(233, 233, 233);
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
      &.rotate {
        animation: playRotate 26s linear infinite;
      }
      img {
        height: 270px;
        width: 270px;
        border-radius: 50%;
      }
    }
    .lyrics {
      width: 100%;
      height: 100%;
      .lyric-scroll-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-content {
          .current-lyric {
            .text {
              text-align: center;
              color: rgba(189, 180, 180, 0.979);
              font-size: 13px;
              line-height: 35px;
              &.current {
                color: white;
              }
            }
          }
          .lyric-state {
            padding-top: 35px;
            text-align: center;
            color: rgb(222, 222, 222);
          }
        }
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
      .download {
        color: rgb(233, 233, 233);
        text-align: center;
        font-size: 20px;
        text-decoration: none;
      }
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
    align-items: center;
    .list-items {
      flex: 1;
      color: rgb(233, 233, 233);
      text-align: center;
      font-size: 20px;
      &.status {
        font-size: 38px;
      }
      &.play-mode {
        background-repeat: no-repeat;
        background-size: 40%;
        background-position: center center;
        height: 20px;
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

@keyframes playRotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>