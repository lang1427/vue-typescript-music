<template>
  <div v-show="isShow" class="message-box" :style="offsetBottom">
    <span class="message">{{ message }}</span>
  </div>
</template>

<script lang="ts">
export default {
  // @Prop({ default: "新的消息" }) message!: string;
  // @Prop({ default: false }) isShow!: boolean;
  // @Prop({ default: 100 }) bottom!: number;

  props: {
    message: { type: String, default: "新的消息" },
    isShow: { type: Boolean, default: false },
    bottom: { type: Number, default: 100 },
  },

  computed: {
    offsetBottom() {
      return {
        bottom: this.bottom + "px",
      };
    },
  },
};
</script>
<style scoped lang="less">
.message-box {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 111111111;
  text-align: center;
  .message {
    display: inline-block;
    padding: 5px;
    font-size: 12px;
    background-color: rgba(233, 233, 233, 0.9);
    border-radius: 3px 2px;
  }
}
</style>
