<template>
  <div>
    <!-- 遮挡层 -->
    <div v-show="popupShow" class="bottom-popup" @click.self="hide"></div>
    <!-- 内容层 -->
    <transition name="bottom-popup">
      <div class="popup-bottom" v-show="popupShow">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class BottomPopup extends Vue {
  @Prop() popupShow!: boolean;
  hide() {
    this.$emit("hide");
  }
}
</script>
<style scoped lang='less'>
.bottom-popup {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.75);
}
.popup-bottom {
  position: absolute;
  z-index: 111111;
  background-color: white;
  border-radius: 15px 15px 0 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.bottom-popup-enter-active,
.bottom-popup-leave-active {
  transition: all .3s;
}
.bottom-popup-enter,
.bottom-popup-leave-to {
  transform: translateY(100%);
}
</style>