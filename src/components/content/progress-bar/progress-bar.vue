<template>
  <div class="progress-bar">
    <div class="time" ref="currentTime">
      <slot name="time-current"></slot>
    </div>
    <div
      class="progress"
      ref="progress"
      @click="progressClick"
      @touchstart="progressStart"
      @touchmove="progressMove"
      @touchend="progressEnd"
    >
      <div class="line" ref="line" :style="[width]"></div>
    </div>
    <div class="time">
      <slot name="time-total"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component
export default class ProgressBar extends Vue {
  @Prop({ default: 0 }) progress!: number;
  private totalProgress: number = 0; // 初始值不能<0，小于0 则需要移动进度条至左外侧才能生效 (bug)
  private percent: number = 0;
  private moveStatus: boolean = false;

  created() {}
  mounted() {
    // 当采用v-show条件渲染时，这里的clientWidth = 0 ，所以需要在update时设置进度条的宽度
    // this.totalProgress = (<any>this.$refs).progress.clientWidth;
  }
  updated() {
    this.totalProgress = (<any>this.$refs).progress.clientWidth;
  }
  get width() {
    return {
      width:
        this.totalProgress === 0
          ? "0px"
          : this.totalProgress * this.progress >= this.totalProgress
          ? this.totalProgress + "px"
          : this.totalProgress * this.progress + "px"
    };
  }

  progressClick(e: MouseEvent) {
    let moveLineWidth = e.pageX - (<any>this.$refs).currentTime.offsetWidth;
    this.percent = Math.max(0, moveLineWidth / (e as any).toElement.offsetWidth); // e.toElement.offsetWidth 解决 totalProgress获取值不正确的问题
    this.$emit("endPercent", this.percent);
  }
  progressStart(e: TouchEvent) {
    this.moveStatus = true;
  }
  progressMove(e: TouchEvent) {
    if (!this.moveStatus) return;

    // 移动过程中进度条的宽度  =  当前移动过程中PageX的值 - 展示当前时间div的宽度
    let moveLineWidth =
      e.touches[0].pageX - (<any>this.$refs).currentTime.offsetWidth;
    // 进度百分比 = 移动过程中进度条的宽度 / 进度栏
    this.percent = Math.max(0, moveLineWidth / this.totalProgress);
    // 向外告知 当前移动过程中的百分比
    this.$emit("changePercent", this.percent);
  }
  progressEnd(e: TouchEvent) {
    this.moveStatus = false;
    this.$emit("endPercent", this.percent);
  }
}
</script>
<style scoped lang='less'>
.progress-bar {
  display: flex;
  height: 30px;
  align-items: center;
  touch-action: pan-x pinch-zoom;
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  .time {
    width: 60px;
    text-align: center;
  }
  .progress {
    flex: 1;
    height: 6px;
    border-radius: 2px 3px;
    background: #ebeef5;
    .line {
      height: 100%;
      background-color: red;
    }
  }
}
</style>