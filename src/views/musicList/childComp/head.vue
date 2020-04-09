<template>
  <topbar class="album-head">
    <div slot="left" @click="back">
      <span class="fa-arrow-left back"></span>
    </div>
    <div slot="center">
      <h2 class="title">{{ topTitle }}</h2>
    </div>
  </topbar>
</template>

<script lang='ts'>
import topbar from "@/components/common/navbar/navbar.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    topbar
  }
})
export default class AlbumHead extends Vue {
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
  .back {
    font-size: 20px;
  }
  .title {
    font-size: 16px;
  }
}
</style>