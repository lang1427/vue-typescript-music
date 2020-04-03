<template>
  <div class="player" v-if="$store.getters.playListLength!=0">
    <full-player
      v-show="!isMiniShow"
      :percent="Peraent"
      :playStatu="isPlay"
      :currentTime="currentTime"
      :totalTime="duration"
      @toggle="toggle"
      @playStatus="playStatus"
      @changePercent="changePercent"
      @endPercent="endPercent"
      @prev="prev"
      @next="next"
    ></full-player>
    <mini-player
      v-show="isMiniShow"
      :percent="Peraent"
      :playStatu="isPlay"
      @toggle="toggle"
      @playStatus="playStatus"
    ></mini-player>
    <audio
      ref="audio"
      autoplay
      @loadstart="loadstart"
      @canplay="canplay"
      @canplaythrough="loadComplete"
      @timeupdate="timeupdate"
      @ended="playEnd"
    ></audio>
    <kl-message message="加载中，请稍后..." :isShow="isLoading" />
  </div>
</template>

<script lang='ts'>
// import { mapGetters } from 'vuex'
import fullPlayer from "./childComp/full-player.vue";
import miniPlayer from "./childComp/mini-player.vue";
import klMessage from "@/components/common/message/message.vue";
import { isCanMusic, musicUrl } from "@/service/player";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "Player",
  components: {
    fullPlayer,
    miniPlayer,
    klMessage
  }
  // computed:{
  //   ...mapGetters(['playMusicID'])
  // }
})
export default class Player extends Vue {
  private isMiniShow: boolean = true; // 默认播放时 显示 迷你播放器
  private url: string = "";
  private duration: number = 0; // 总时长
  private currentTime: number = 0; // 当前播放的时间
  private isPlay: boolean = false;
  private isMove: boolean = false;
  private isLoading: boolean = false;

  get Peraent() {
    return this.duration === 0 ? 0 : this.currentTime / this.duration;
  }

  created() {}
  mounted() {
    this.getIsCanMusic(() => {
      this.stop();
      this.isPlay = false;
    });
  }

  async getIsCanMusic(callback?: Function) {
    if (this.$store.getters.playMusicID === -1) return false;
    let res = await isCanMusic(this.$store.getters.playMusicID);
    if (res.success) {
      this.getMusicURL(callback);
    } else {
      this.$toast(res.message);
    }
  }
  async getMusicURL(callback?: Function) {
    let res = await musicUrl(this.$store.getters.playMusicID);
    if (res.code === 200) {
      this.isPlay = true;
      this.url = res.data[0].url;
      this.$nextTick(() => {
        // 确保刷新后不会自动播放
        callback && callback();
      });
    }
  }

  @Watch("$store.state.currentPlayIndex")
  changeCurrentPlayIndex() {
    this.getIsCanMusic();
  }
  @Watch("url")
  changeURL(newVal: string) {
    (<HTMLAudioElement>this.$refs.audio).src = newVal;
  }

  play() {
    (<HTMLAudioElement>this.$refs.audio).play();
  }
  stop() {
    (<HTMLAudioElement>this.$refs.audio).pause();
  }
  singleloop() {
    (<HTMLAudioElement>this.$refs.audio).currentTime = 0;
    this.play();
  }
  prev() {
    this.isLoading = true;
    if (this.$store.state.playMode === 2) {
      let random = Math.floor(
        Math.random() * this.$store.getters.playListLength
      );
      this.$store.dispatch("changeCurrentPlayIndex", random);
    } else {
      let index = this.$store.state.currentPlayIndex;
      if (index <= 0) {
        this.$store.dispatch(
          "changeCurrentPlayIndex",
          this.$store.getters.playListLength - 1
        );
      } else {
        this.$store.dispatch("changeCurrentPlayIndex", index - 1);
      }
    }
  }
  next() {
    this.isLoading = true;
    if (this.$store.state.playMode === 2) {
      let random = Math.floor(
        Math.random() * this.$store.getters.playListLength
      );
      this.$store.dispatch("changeCurrentPlayIndex", random);
    } else {
      let index = this.$store.state.currentPlayIndex;
      if (index >= this.$store.getters.playListLength - 1) {
        this.$store.dispatch("changeCurrentPlayIndex", 0);
      } else {
        this.$store.dispatch("changeCurrentPlayIndex", index + 1);
      }
    }
  }

  changePercent(newVal: number) {
    this.isMove = true;
    this.currentTime = newVal * this.duration;
  }
  endPercent(newVal: number) {
    this.currentTime = newVal * this.duration; // 因为点击事件 是没有滑动过程的，所以这行代码仅仅是为了直接在进度条中点击的操作
    (<HTMLAudioElement>this.$refs.audio).currentTime = this.currentTime;
    if ((<HTMLAudioElement>this.$refs.audio).paused) {
      this.stop();
    } else {
      this.play();
    }
    this.isMove = false;
  }
  playStatus(val: boolean) {
    this.isPlay = val;
    if (val) {
      this.play();
    } else {
      this.stop();
    }
  }
  toggle(newVal: boolean) {
    this.isMiniShow = newVal;
  }

  /* ============= audio 事件 ====================*/
  // 开始加载时
  loadstart() {
    // this.isLoading = true
  }
  // 缓冲至目前可播放的状态
  canplay() {
    this.isLoading = false;
  }
  // 歌曲已加载完成
  loadComplete(e: any) {
    this.duration = e.target.duration;
  }
  // 当前播放时间发生改变时执行
  timeupdate(e: any) {
    if (!this.isMove) {
      this.currentTime = e.target.currentTime;
    }
  }
  // 当前歌曲播放完了执行
  playEnd() {
    if (this.$store.state.playMode === 1) {
      this.singleloop();
    } else {
      this.next();
    }
  }
  /*  当时想法错误操作
  playEnd() {
    //  0列表循环   1单曲循环   2随机播放
    switch (this.$store.state.playMode) {
      case 0:
        let index = this.$store.state.currentPlayIndex;
        if (index >= this.$store.getters.playListLength - 1) {
          this.$store.dispatch("changeCurrentPlayIndex", 0);
        } else {
          this.$store.dispatch("changeCurrentPlayIndex", index + 1);
        }
        break;
      case 1:
        (<any>this.$refs.audio).loop = true;
        break;
      case 2:
        let random = Math.floor(
          Math.random() * this.$store.getters.playListLength
        );
        this.$store.dispatch("changeCurrentPlayIndex", random);
        break;
    }
  }
  */
}
</script>
<style scoped lang='less'>
.player {
}
</style>