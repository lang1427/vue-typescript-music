<template>
  <div>
    <!-- 遮挡层 -->
    <div
      v-show="popupShow"
      class="bottom-popup"
      @click.self.stop="hide"
      @touchmove.self.stop="hide"
    ></div>
    <!-- 内容层 -->
    <transition name="bottom-popup">
      <div class="popup-bottom" v-show="popupShow" :style="'background:'+bgcolor">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component
export default class BottomPopup extends Vue {
  @Prop() popupShow!: boolean;
  @Prop({
    default: "white"
  })
  bgcolor!: string;

  destroyed() {
    document.body.classList.remove("hidden");
  }

  hide() {
    this.$emit("hide");
  }

  // 锁定背景滚动 操作
  @Watch("popupShow")
  changePopupShow(newVal: boolean) {
    if (newVal === true) {
      document.body.classList.add("hidden");
    } else {
      document.body.classList.remove("hidden");
    }
  }
}
</script>
<style lang='less'>
// 不让cssModules 添加 哈希值的方式 ： 不要 scoped
.hidden {
  overflow: hidden;
}
</style>
<style scoped lang='less'>
.bottom-popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.75);
}
.popup-bottom {
  position: fixed;
  z-index: 111111;
  border-radius: 15px 15px 0 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.bottom-popup-enter-active,
.bottom-popup-leave-active {
  transition: all 0.3s;
}
.bottom-popup-enter,
.bottom-popup-leave-to {
  transform: translateY(100%);
}
</style>