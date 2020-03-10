<template>
  <div class='My'>
    <my-head />
    <my-music/>
    <my-songslist />
  </div>
</template>

<script lang='ts'>
import myHead from './childComp/head.vue'
import myMusic from './childComp/my_music.vue'
import mySongslist from './childComp/my_songslist.vue'
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name:'My',
  components:{
    myHead,
    myMusic,
    mySongslist
  }
})
export default class My extends Vue{
  
created(){}
 
}
</script>
<style scoped lang='less'>
.My{}
</style>