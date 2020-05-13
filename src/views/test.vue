<template>
  <div class="test">
    <button @click="changeQuery">change query</button>
  </div>  
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component({
})
export default class Test extends Vue {
  
  created(){
    this.$route.query.name = 'xxxxx'
    console.log(this.$route.query)
  }
  changeQuery(){
    this.$route.query.name = '更新数据'
    console.log(this.$route.query)
  }
}
</script>
<style scoped lang='less'>
.test {
}
</style>