<template>
  <div class="progress-circle">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 100 100"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- 圆心坐标（50,50） 半径50 -->
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
      <circle
        class="progress-bar"
        r="50"
        cx="50"
        cy="50"
        fill="transparent"
        :stroke-dasharray="dashArray"
        :stroke-dashoffset="dashOffset"
        :stroke="progressColor"
      />
    </svg>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
/** cx,cy:圆心坐标  r:半径  fill:填充颜色 */
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class ProgressCircle extends Vue {
  @Prop({ default: 100 }) size!: number; // 圆的大小
  @Prop({ default: 0 }) currentProgress!: number; // 当前进度  0 ~ 1
  @Prop({ default: "red" }) progressColor!: string; // 进度条的颜色

  private dashArray: number = Math.PI * 100; // 圆的周长

  get dashOffset() {
    return (1 - this.currentProgress) * this.dashArray;
  }
  created() {}
}
</script>
<style scoped lang='less'>
.progress-circle {
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: #ebeef5;
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
    }
  }
}
</style>