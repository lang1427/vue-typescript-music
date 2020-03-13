<template>
  <div class='test'>
<ver-code :count=6 mode="letter-number" @inputComplete="go"></ver-code>
  </div>
</template>

<script lang='ts'>
import verCode from '@/components/content/verify-code/verify-code.vue'
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components:{
    verCode
  }
})
export default class Test extends Vue{
  
created(){}
 go(val:string){
   console.log(val)
 }
}
</script>
<style scoped lang='less'>
.test{}
</style>