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
    <!-- <div v-show="operationShow">
      <transition name="slide-fade">
        <ul class="operation-dialog">
          <li>
            <span class="fa-plus-square-o"></span>添加歌曲
          </li>
          <li>
            <span class="fa-edit"></span>编辑歌单信息
          </li>
        </ul>
      </transition>
    </div> -->
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
  back() {
    this.$router.back();
  }
  get topTitle() {
    if (this.$route.path.match(/\/album\//)) {
      return "专辑";
    } else if (this.$route.path.match(/\/songsheet\//)) {
      return "歌单";
    }
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
.operation-dialog {
  position: absolute;
  right: 0;
  top: 0;
  width: 200px;
  z-index: 1010;
  border-left: 1px solid #dedecd;
  border-bottom: 1px solid #dedecd;
  box-shadow: 0 0 2px #eee;
  background-color: white;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 5s;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform-origin: right top;
  transform: scale(1);
}
</style>