<template>
  <!-- 使用 ： 需要设置scroll的高度 并且在scroll插槽里只能有一个子元素 -->
  <div class="scroll-wrapper" ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import BScroll from "better-scroll";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class ScrollWrapper extends Vue {
  @Prop({ default: 0 }) probeType!: number; // 0 :不监听滚动的位置 ，1：超过一段时间监听 ， 2：滚动时监听 ， 3：实时监听（滚动结束后的惯性滚动依然监听）
  @Prop({ default: false }) freeScroll!: boolean; //  是否同时支持 X轴和Y轴 的滚动
  @Prop({ default: false }) pullUpLoad!: boolean; // 用于做上拉加载功能
  @Prop({
    default: "vertical",
    validator(value) {
      return ["vertical", "horizontal"].indexOf(value) !== -1;
    }
  })
  direction!: string; // 滚动方向 可选值：（horizontal：横向，vertical：纵向（默认））

  scroll: any = null;

  /**生命钩子 */
  mounted() {
    this.scroll = new BScroll((this.$refs as any).scrollWrapper, {
      click: true, // 取消 阻止默认浏览器的元素click 事件
      probeType: this.probeType,
      scrollX: !this.Dir,
      scrollY: this.Dir,
      freeScroll: this.freeScroll,
      pullUpLoad: this.pullUpLoad
    });

    // 监听是否滚动到底部（用于实现上拉加载更多） 需对pullUpLoad设置为true才起作用
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });

    // 监听滚动的位置 需要设置 probeType
    this.scroll.on("scroll", (position: object) => {
      this.$emit("scroll", position);
    });
  }
  activated() {
    this.enable();
  }
  deactivated() {
    this.disable();
  }
  beforeDestroy() {
    this.disable();
  }

  /** methods */

  scrollTo(x: number, y: number, easing: number = 500) {
    this.scroll && this.scroll.scrollTo(x, y, easing);
  }
  refresh() {
    //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
    this.scroll && this.scroll.refresh();
  }
  finishPullUp() {
    // 当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载
    this.scroll && this.scroll.finishPullUp();
  }
  scrollToElement() {
    // 滚动到指定目标元素
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
  }
  stop() {
    this.scroll && this.scroll.stop();
  }
  enable() {
    this.scroll && this.scroll.enable();
  }
  disable() {
    // 禁用 better-scroll
    this.scroll && this.scroll.disable();
  }

  /**计算属性 */
  get Dir(): boolean {
    if (this.direction === "horizontal") {
      return false;
    }
    return true;
  }
}
</script>

<style lang="less" scoped></style>
