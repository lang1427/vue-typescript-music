<template>
  <div class="test">
    <kl-dialog :dialogShow="isShow" @hide="isShow= false" bgcolor="green">
      <div>行行行</div>
    </kl-dialog>
    <button @click="isShow=true">common</button>
  </div>
</template>

<script lang='ts'>
import noticeBar from "@/components/common/noticeBar/notice-bar.vue";
import klDialog from "@/components/common/kl-dialog/kl-dialog.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    noticeBar,
    klDialog
  }
})
export default class Test extends Vue {
  private isShow = false;
}
</script>
<style scoped lang='less'>
.test {
}
</style>