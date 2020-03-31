<template>
  <div class="player">
    <full-player v-show="!isMiniShow" @toggle="toggle"></full-player>
    <mini-player :percent="Peraent" v-show="isMiniShow" @toggle="toggle"></mini-player>
    <audio ref="audio" autoplay @timeupdate="timeupdate" @ended="playEnd"></audio>
  </div>
</template>

<script lang='ts'>
import fullPlayer from "./childComp/full-player.vue";
import miniPlayer from "./childComp/mini-player.vue";
import { isCanMusic, musicUrl } from "@/service/player";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "Player",
  components: {
    fullPlayer,
    miniPlayer
  }
})
export default class Player extends Vue {
  private isMiniShow: boolean = true; // 默认播放时 显示 迷你播放器
  private musicID: number = -1;
  private url: string = "";
  private duration: number = 0; // 总时长
  private currentTime: number = 0; // 当前播放的时间

  get Peraent() {
    // 进度
    return this.duration === 0 ? 0 : this.currentTime / this.duration;
  }
  created() {
    (<any>this).$bus.$on("musicID", (id: number) => {
      this.musicID = id;
    });
  }

  async getIsCanMusic() {
    if (this.musicID === -1) return false;
    let res = await isCanMusic(this.musicID);
    if (res.success) {
      this.getMusicURL();
    } else {
      this.$toast(res.message);
    }
  }
  async getMusicURL() {
    let res = await musicUrl(this.musicID);
    if (res.code === 200) {
      this.url = res.data[0].url;
    }
  }

  @Watch("musicID")
  changeMusicID() {
    this.getIsCanMusic();
  }
  @Watch("url")
  changeURL(newVal: string) {
    (<any>this.$refs.audio).src = newVal;

    // 音乐播放时 并不能马上拿到总时长
    let stop = window.setInterval(() => {
      this.duration = (<any>this.$refs.audio).duration;
      if (this.duration) window.clearInterval(stop);
    }, 150);
  }

  toggle(newVal: boolean) {
    this.isMiniShow = newVal;
  }
  // 当前播放时间发生改变的时候执行的事件
  timeupdate(e: any) {
    this.currentTime = e.target.currentTime;
  }
  // 当前这首音乐已播放完毕
  playEnd(){
    console.log('播放完毕')
  }
}
</script>
<style scoped lang='less'>
.player {
}
</style>