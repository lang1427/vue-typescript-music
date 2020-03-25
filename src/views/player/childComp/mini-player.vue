<template>
  <div class="mini-player">
    <div class="player-img">
      <img src="~@/assets/images/singer-bg.png" alt />
    </div>
    <div class="singer-info">
      <p class="name">最美的期待</p>
      <p class="tip">滑动可以切换上下首哦</p>
    </div>
    <div class="play-or-stop">
      <progress-circle :size="40" :currentProgress="currentProgress">
        <!-- 中间需要展示的暂停或播放的图标 -->
        <span :class="[isPlay?'fa-stop':'fa-play','ico']"></span>
      </progress-circle>
    </div>
    <div class="like">
      <span :class="[isLike?'fa-heart':'fa-heart-o','ico']"></span>
    </div>
  </div>
</template>

<script lang='ts'>
import progressCircle from "@/components/content/progress-circle/progress-circle.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    progressCircle
  }
})
export default class MiniPlayer extends Vue {
  private isPlay: boolean = false; // 是否播放着
  private isLike: boolean = false; // 是否是喜欢的音乐

  get currentProgress() {
    return 0.3;
  }

  created() {}
}
</script>
<style scoped lang='less'>
.mini-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-top: 1px solid #dedede;
  background: rgba(0, 0, 0, 0.6);
  .player-img {
    width: 60px;
    height: 60px;
    padding: 8px;
    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: 50%;
    }
  }
  .singer-info {
    flex: 1;
    padding-left: 8px;
    .tip {
      font-size: 12px;
      color: #999;
    }
  }
  .play-or-stop {
    width: 40px;
    margin: 0 10px;
    .ico {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      padding-left: 2px;
      padding-bottom: 2px;
      &.fa-stop {
        color: red;
      }
    }
  }
  .like {
    width: 50px;
    text-align: center;
    .ico {
      font-size: 38px;
      &.fa-heart {
        color: red;
      }
    }
  }
}
</style>