<template>
  <div class="test">
    <notice-bar text="123123131412342351235421542345234123542351243333333335554416513">
      <div slot="left">▽</div>
    </notice-bar>
    <a
      href="http://m701.music.126.net/20200416153821/4989035cd6c829bbdc06bc1dfe72b9d4/jdymusic/obj/w5zDlMODwrDDiGjCn8Ky/2091416578/ec9a/be4f/0cd6/3be89f888fcbda57ed0a69d027160699.mp3"
    >下载？</a>
  </div>
</template>

<script lang='ts'>
import noticeBar from "@/components/common/noticeBar/notice-bar.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    noticeBar
  }
})
export default class Test extends Vue {}
</script>
<style scoped lang='less'>
.test {
}
</style>