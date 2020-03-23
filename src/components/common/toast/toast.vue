<template>
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div :style="positionStyle" class="toast" v-show="visible" v-html="message"></div>
  </transition>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  name: "Toast"
})
export default class Toast extends Vue {
  private message: string = "消息提示";
  private visible: boolean = false; // 是否可见
  private closed: boolean = false; // 关闭状态 （默认已关闭）
  private onClose: any = null; // 关闭方法 ----> 实例对象中
  private offsetTop: number = 60; // 距离顶部的偏移量
  private duration: number = 3000; // 持续时间
  private timer: any = null; // 定时器

  get positionStyle() {
    return {
      top: `${this.offsetTop}px`
    };
  }
  created() {}
  mounted() {
    this.startTimer();
  }
  beforeDestory() {
    this.stopTimer();
  }

  // 监听closed的变化 用于离开删除当前元素
  @Watch("closed")
  changeClosed(newVal: boolean) {
    if (newVal) {
      this.visible = false;
    }
  }

  // 离开时 删除掉当前toast元素
  handleAfterLeave() {
    this.$destroy();
    (<Element>this.$el.parentNode).removeChild(this.$el);
  }

  // 启动定时器
  startTimer() {
    if (this.duration > 0) {
      this.timer = window.setTimeout(() => {
        if (!this.closed) {
          this.close();
        }
      }, this.duration);
    }
  }
  // 停止定时器
  stopTimer() {
    window.clearTimeout(this.timer);
  }
  close() {
    // console.log(this.onClose)
    /** 因为实例化构造器时 并没有把options放进去实例化，所以这里的onClose 为初始值null  */
    // console.log(typeof this.onClose) // 封装过程中，发现 onClose 的类型为 object，而elementUI中的此类型尽然是function

    this.closed = true;
    if (typeof this.onClose === "function") {
      this.onClose(this);
    }
  }
}
</script>
<style scoped lang='less'>
.toast {
  background: rgba(0, 0, 0, 0.75);
  color: white;
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 2px 3px;
  position: fixed;
  left: 50%;
  top: 60px;
  transform: translateX(-50%);
  transition: opacity 0.3s, transform 0.4s, top 0.4s;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.message-fade-enter,
.message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>