<template>
  <div class="test">
    <tabbar :tabbarInfo="res" />
  </div>
</template>

<script>
import tabbar from "components/content/tab-bar/tab-bar.vue";
export default {
  name: "test",
  components: {
    tabbar
  },
  data() {
    return {
      res: [
        { title: "主页", size: null },
        { title: "歌曲", size: null },
        { title: "专辑", size: 46 },
        { title: "视频", size: 199 }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
// .test {
// }
</style>