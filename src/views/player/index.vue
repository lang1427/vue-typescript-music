<template>
  <div class="player">
    <full-player v-show="!isMiniShow" @toggle="toggle"></full-player>
    <mini-player v-show="isMiniShow" @toggle="toggle"></mini-player>
    <audio ref="audio" autoplay></audio>
  </div>
</template>

<script lang='ts'>
import fullPlayer from "./childComp/full-player.vue";
import miniPlayer from "./childComp/mini-player.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Player",
  components: {
    fullPlayer,
    miniPlayer
  }
})
export default class Player extends Vue {
  private isMiniShow:boolean = true  // 默认播放时 显示 迷你播放器
  private url:string = ''
  created() {}

  toggle(newVal:boolean){
    this.isMiniShow = newVal
  }
}
</script>
<style scoped lang='less'>
.player {
}
</style>