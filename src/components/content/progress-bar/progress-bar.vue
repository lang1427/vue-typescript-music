<template>
  <div class="progress-bar">
    <div class="time">
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
      <div class="line" :style="[width]"></div>
    </div>
    <div class="time">
      <slot name="time-total"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class ProgressBar extends Vue {
  @Prop({ default: 0 }) progress!: number;

  created() {}

  get width() {
    return {
      width: 13 + "px"
    };
  }
  progressClick() {
    console.log(1);
  }
  progressStart(e: Event) {
    console.log(2);
  }
  progressMove() {}
  progressEnd() {}
}
</script>
<style scoped lang='less'>
.progress-bar {
  display: flex;
  height: 30px;
  align-items: center;
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