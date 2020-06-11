<template>
  <div>
    <topbar class="album-head">
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="center">
        <h2 class="title">{{ topTitle }}</h2>
      </div>
      <div slot="right" v-if="operation" @click="operationShow=true">
        <span class="fa-ellipsis-v"></span>
      </div>
    </topbar>
    <!-- 操作框 -->
    <div>
      <div
        v-show="operationShow"
        class="operation-overlay"
        @click.self.stop="hide"
        @touchstart.self.stop="hide"
      ></div>
      <transition name="bounce">
        <ul class="operation-dialog" v-show="operationShow">
          <li @click="goAddSongPage">
            <span class="fa-plus-square-o"></span>&nbsp;&nbsp;添加歌曲
          </li>
          <li @click="goEditSong">
            <span class="fa-edit"></span>&nbsp;&nbsp;编辑歌单信息
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script lang='ts'>
import topbar from "@/components/common/navbar/navbar.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {
    topbar
  }
})
export default class AlbumHead extends Vue {
  @Prop({ default: false }) operation!: boolean;
  private operationShow: boolean = false;
  created() {}
  get topTitle() {
    if (this.$route.path.match(/\/album\//)) {
      return "专辑";
    } else if (this.$route.path.match(/\/songsheet\//)) {
      return "歌单";
    } else if (this.$route.path.match(/\/toplist\//)) {
      return "排行榜";
    }
  }
  back() {
    this.$router.back();
  }
  goEditSong() {
    this.$router.push({
      path: "/songmanage/update?id=" + this.$route.params.id
      // query: {
      //   songId: this.$route.params.id,
      //   name: (this.$parent as any).baseInfo.title,
      //   tags: (this.$parent as any).baseInfo.tags.join("-"),
      //   desc: (this.$parent as any).baseInfo.description
      // }
    });
  }
  goAddSongPage() {
    this.$router.push("/songmanage/add?id=" + this.$route.params.id);
  }

  hide() {
    this.operationShow = false;
  }
}
</script>
<style scoped lang='less'>
.album-head {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0;
  background-color: white;
  z-index: 999;
  .back,
  .fa-ellipsis-v {
    font-size: 20px;
  }
  .title {
    font-size: 16px;
  }
}
.operation-overlay {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1007;
}
.operation-dialog {
  position: fixed;
  right: 0;
  top: 0;
  width: 200px;
  z-index: 1008;
  border-left: 1px solid #dedecd;
  border-bottom: 1px solid #dedecd;
  box-shadow: 0 0 2px #eee;
  background-color: white;
  li {
    padding: 8px 4px;
  }
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
    transform-origin: right top;
  }
  100% {
    transform: scale(1);
  }
}
</style>