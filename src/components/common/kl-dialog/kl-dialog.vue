<template>
  <div class="dialog">
    <!-- 遮挡层 -->
    <div
      v-show="dialogShow"
      class="dialog-overlay"
      :style="{zIndex:overlayZIndex}"
      @click.self.stop="hide"
      @touchmove.self.stop="hide"
    ></div>
    <!-- 内容层 -->
    <transition name="dialog-transition">
      <div class="dialog-content" v-show="dialogShow" :style="objStyle">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class Dialog extends Vue {
  @Prop({ default: false }) dialogShow!: boolean;
  @Prop({ default: "white" }) bgcolor!: string;
  @Prop({ default: 99999 }) overlayZIndex!: number;
  @Prop({ default: 111111 }) zIndex!: number;
  created() {}

  get objStyle() {
    return {
      backgroundColor: this.bgcolor,
      zIndex: this.zIndex
    };
  }

  hide() {
    this.$emit("hide");
  }
}
</script>
<style scoped lang='less'>
.dialog {
  .dialog-overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
  }
  .dialog-content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 3px;
  }

  .dialog-transition-enter-active,
  .dialog-transition-leave-active {
    transition: opacity 0.5s;
  }
  .dialog-transition-enter,
  .dialog-transition-leave-to {
    opacity: 0;
  }
}
</style>