<template>
  <div class="test">
    <button @click="didi">滴滴</button>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    // toast
  }
})
export default class Test extends Vue {
  didi() {
    this.$toast("1231231");
  }
}
</script>
<style scoped lang='less'>
.test {
}
</style>