<template>
  <transition name="bottom-popup">
    <div class="bottom-popup" ref="bottomPopup" v-show="isShow" @click="hide">
      <div class="popup-bottom">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component
export default class BottomPopup extends Vue {
  @Prop({
    default: false
  })
  popupShow!: boolean;

  private isShow: null | boolean = null;
  private popupHeight: number = 0;

  @Watch("popupShow")
  changePopupshow(newVal: boolean) {
      /** 直接用 Vue提供的transition动画，既不需要等dom显示时拿到offsetHeight，也不需要手写animation */
    // if (newVal == true) {
      // :style="'bottom:-'+popupHeight+'px'"
      //   this.$nextTick(function() {
      //     this.popupHeight = (<any>(
      //       this.$refs.bottomPopup
      //     )).children[0].offsetHeight;
      //   });
    // }
    return (this.isShow = newVal);
  }

  created() {}
  mounted() {}
  hide() {
    if (this.isShow == true) {
      this.$emit("hide");
    }
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
  .popup-bottom {
    position: absolute;
    z-index: 111111;
    background-color: white;
    border-radius: 15px 15px 0 0;
    left: 0;
    right: 0;
    bottom: 0;
    // animation: enterBottomPopup 1s forwards;
  }
}

.bottom-popup-enter,
.bottom-popup-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.bottom-popup-enter-active,
.bottom-popup-leave-active {
  transition: all 0.8s;
}

// @keyframes enterBottomPopup {
//   0% {
//     transform: translateY(-20%);
//   }
//   50% {
//     transform: translateY(-50%);
//   }
//   100% {
//     transform: translateY(-100%);
//   }
// }
</style>