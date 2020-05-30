<template>
  <div class="test">
    <button @click="changeQuery">change query</button>
    <div style="padding:30px;background:green;" v-longpress="{'methods':didi,'params':'123'}" >自定义事件</div>
  </div>  
</template>

<script lang='ts'>
import '@/utils/longpress'
import { Component, Vue } from "vue-property-decorator";
@Component({
})
export default class Test extends Vue {
  private arr = [12,34,56]
  created(){
    this.$route.query.name = 'xxxxx'
    console.log(this.$route.query)
  }
  changeQuery(){
    this.$route.query.name = '更新数据'
    console.log(this.$route.query)
  }
  didi(id:string){
    console.log(id)
    console.log('didi')
  }
}
</script>
<style scoped lang='less'>
.test {
}
</style>