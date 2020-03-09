<template>
  <div class='My'>
    <my-head />
    <my-music/>
  </div>
</template>

<script lang='ts'>
import myHead from './childComp/head.vue'
import myMusic from './childComp/my_music.vue'
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name:'My',
  components:{
    myHead,
    myMusic
  }
})
export default class My extends Vue{
  
created(){}
 
}
</script>
<style scoped lang='less'>
.My{}
</style>