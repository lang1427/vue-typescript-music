<template>
  <div v-show="true" :style="barStyle" @click="emit" class="kl-notice-bar">
    <div class="ico-left">
      <slot name="left" />
    </div>
    <!-- 父级容器 -->
    <div ref="wrap" class="kl-notice-bar_wrap">
      <!-- 上下文容器 -->
      <div
        ref="content"
        class="kl-notice-bar_content"
        :class="[animationClass,{'kl-ellipsis':!scrollable}]"
        :style="contentStyle"
        @animationend="onAnimationEnd"
        @WebkitAnimationEnd="onAnimationEnd"
      >{{text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String, // 文本
    color: String,
    background: String,
    scrollable: {
      // 是否在长度溢出时滚动播放
      type: Boolean,
      default: true
    },
    speed: {
      // 滚动速率 = 内容总宽度 / 动画总时长
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      wrapWidth: 0,
      contentWidth: 0,
      firstRound: true,
      animationClass: "",
      duration: 0 // 总动画时长
    };
  },
  watch: {
    text: {
      //   当text一有新值，值被改变就会立即执行handler 需要设置immediate：true
      handler() {
        this.startScroll();
      },
      immediate: true
    }
  },
  computed: {
    barStyle() {
      return {
        color: this.color,
        backgroundColor: this.background
      };
    },
    contentStyle() {
      return {
        paddingLeft: this.firstRound ? 0 : this.wrapWidth + "px",
        animationDelay: (this.firstRound ? this.delay : 0) + "s",
        animationDuration: this.duration + "s",
        color: this.color
      };
    }
  },
  methods: {
    emit() {
      this.$emit("click");
    },
    onAnimationEnd() {
      this.firstRound = false;
      this.$nextTick(() => {
        this.duration = (this.contentWidth + this.wrapWidth) / this.speed;
        this.animationClass = "play-infinite";
      });
    },
    reset() {
      // 先重置一波
      this.wrapWidth = 0;
      this.contentWidth = 0;
      this.animationClass = "";
      this.duration = 0;
    },
    // 开启滚动
    startScroll() {
      this.$nextTick(() => {
        const { wrap, content } = this.$refs; // this.$refs == <el>[wrap,content]
        if (!wrap || !content) {
          return;
        }
        const wrapWidth = wrap.getBoundingClientRect().width;
        const contentWidth = content.getBoundingClientRect().width;
        if (this.scrollable && contentWidth > wrapWidth) {
          this.wrapWidth = wrapWidth;
          this.contentWidth = contentWidth;
          this.duration = contentWidth / this.speed;
          this.animationClass = "play";
        } else {
          this.reset();
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.kl-notice-bar {
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 14px;
  line-height: 24px;
  position: relative;
  .ico-left {
    width: 40px;
    text-align: center;
  }
  .kl-notice-bar_wrap {
    flex: 1;
    height: 24px;
    overflow: hidden;
    position: relative;
    .kl-notice-bar_content {
      position: absolute;
      white-space: nowrap;
      &.kl-ellipsis {
        max-width: 100%;
      }
      &.play {
        animation: kl-notice-bar-play linear both;
      }
      &.play-infinite {
        animation: kl-notice-bar-play-infinite linear infinite both;
      }
    }
  }
}

@keyframes kl-notice-bar-play {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes kl-notice-bar-play-infinite {
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
</style>