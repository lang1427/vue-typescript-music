<template>
  <div class="test">
    <!-- <kl-dialog :dialogShow="isShow" @hide="isShow= false" bgcolor="green">
      <div>行行行</div>
    </kl-dialog>-->
    <kl-confirm
      :isShow="isShow"
  
      titleAlign="center"
      content="哈哈哈我爱仕达擦擦四方股份大部分都好得很暗示法飒飒大色为各个地方地方巴斯夫爱上我如发生发这些都是干湿奥术大师非电热哈欠污染事故负担"
      @cancel="isShow=false"
      @confirm="isShow=false"
    ></kl-confirm>
    <button @click="isShow=true">common</button>
  </div>
</template>

<script lang='ts'>
import noticeBar from "@/components/common/noticeBar/notice-bar.vue";
import klDialog from "@/components/common/kl-dialog/kl-dialog.vue";
import klConfirm from "@/components/common/kl-confirm/kl-confirm.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    noticeBar,
    klDialog,
    klConfirm
  }
})
export default class Test extends Vue {
  private isShow = false;
  cancel() {
    console.log("取消");
  }
}
</script>
<style scoped lang='less'>
.test {
}
</style>