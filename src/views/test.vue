<template>
  <div class="test">
    <!-- <player/> -->
  <progress-bar :progress="currentProgress">
    <div slot="time-current">00:00</div>
    <div slot="time-total">04:30</div>
  </progress-bar>
  </div>
</template>

<script lang='ts'>
// import player from '@/views/player/index.vue'
import progressBar from '@/components/content/progress-bar/progress-bar.vue'

import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    // player
    progressBar
  }
})
export default class Test extends Vue {
  index = 0
  didi() {
    this.$toast("1231231");
  }
  get currentProgress(){
    setTimeout(()=>{
      this.index += 0.01 
      if(this.index == 1){
        clearTimeout()
      }
      
    },1000)
    return this.index
  }
}
</script>
<style scoped lang='less'>
.test {
  margin-top: 100px;
}
</style>