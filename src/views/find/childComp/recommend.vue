<template>
  <div class="recommend">
    <div
      class="recommend-item"
      @click="toast(item.path as string)"
      v-for="item of recommendList"
      :key="item.name"
    >
      <img :src="item.ico" class="ico" />
      <p class="title">{{ item.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import musicSvg from "../image/music.svg";
import diantaiSvg from "../image/diantai.svg";
import paihangSvg from "../image/paihang.svg";
import jiemuSvg from "../image/jiemu.svg";
import mvSvg from "../image/mv.svg";
export default {
  data() {
    return {
      recommendList: [
        { ico: musicSvg, name: "推荐新音乐" },
        { ico: diantaiSvg, name: "推荐电台" },
        {
          ico: paihangSvg,
          name: "排行榜",
          path: "/rankingList",
        },
        { ico: jiemuSvg, name: "推荐节目" },
        { ico: mvSvg, name: "推荐MV" },
      ],
    };
  },
  methods: {
    toast(path: string) {
      if (path) {
        this.$router.push(path);
        return;
      }
      this.$toast("很遗憾，暂未开放此功能");
      return false;
    },
  },
};
</script>

<style lang="less" scoped>
.recommend {
  margin: 10px 0;
  display: flex;
  .recommend-item {
    flex: 1;
    text-align: center;
    padding: 0 5px;
    .ico {
      height: 25px;
    }
    .title {
      padding-top: 3px;
      font-size: 12px;
    }
  }
}
</style>
