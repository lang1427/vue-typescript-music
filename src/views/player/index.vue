<template>
  <div class="player">
    <full-player></full-player>
    <mini-player></mini-player>
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
  created() {}
}
</script>
<style scoped lang='less'>
.player {
}
</style>