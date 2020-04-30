<template>
  <div v-show="isShow && overlay" class="confirm-overlay">
    <div class="kl-confirm" v-show="isShow">
      <div class="confirm-header" v-if="title!==''" :style="align">
        <h5>{{ title }}</h5>
      </div>
      <div class="confirm-content">{{ content }}</div>
      <div class="confirm-btn">
        <span class="cancel" @click="cancel">取消</span>
        <span class="confirm" @click="confirm">确定</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class KlConfirm extends Vue {
  @Prop({ default: false }) isShow!: boolean;
  @Prop({ default: true }) overlay!: boolean;
  @Prop({ default: "" }) title!: string;
  @Prop({ default: "left" }) titleAlign!: string;
  @Prop({ required: true }) content!: string;

  created() {}

  get align() {
    return {
      textAlign: this.titleAlign
    };
  }

  cancel() {
    this.$emit("cancel", "取消");
  }
  confirm() {
    this.$emit("confirm", "确定");
  }
}
</script>
<style scoped lang='less'>
.confirm-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.75);
}
.kl-confirm {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 11111111;
  background-color: white;
  min-width: 200px;
  min-height: 70px;
  border-radius: 6px;
  .confirm-header {
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid @klColor;
    padding: 0 10px;
    h5 {
      color: #666;
    }
  }
  .confirm-content {
    padding: 8px;
    margin-bottom: 30px;
  }
  .confirm-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    text-align: center;
    height: 30px;
    line-height: 30px;
    .cancel {
      flex: 1;
      color: @klColor;
    }
    .confirm {
      flex: 1;
      color: @klColor;
    }
  }
}
</style>