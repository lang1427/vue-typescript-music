<template>
  <div class="search-result">
    <search-result-bar :searchContent="searchValue" />
    <div style="padding-top:50px"></div>
    <nav-bar :text="title" @changeHandler="itemClick">
      <div slot="综合">综合</div>
      <div slot="单曲">单曲</div>
      <div slot="视频">视频</div>
      <div slot="歌手">歌手</div>
      <div slot="专辑">专辑</div>
      <div slot="歌单">歌单</div>
      <div slot="主播电台">主播电台</div>
      <div slot="用户">用户</div>
    </nav-bar>
  </div>
</template>

<script lang='ts'>
interface ISearchResult {
  code: number;
  result: object;
}
import searchResultBar from "./childComp/topbar.vue";
import navBar from "components/common/scrollNavBar/scroll-nav-bar.vue";
import { search } from "@/service/search";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    searchResultBar,
    navBar
  }
})
export default class SearchResult extends Vue {
  private searchValue: string = "";
  private title: string[] = [
    "综合", // 1018
    "单曲", // 1
    "视频", // 1014
    "歌手", // 100
    "专辑", // 10
    "歌单", // 1000
    "主播电台", // 1009
    "用户" // 1002
  ];
  private searchType: number[] = [1018, 1, 1014, 100, 10, 1000, 1009, 1002];
  private currentSearchType: number = this.searchType[0];

  created() {
    (<any>this).$bus.$on("searchResult", (keywords: string) => {
      this.searchValue = keywords;
      search(keywords, 1018, 5, 1).then((res: ISearchResult) => {
        if (res.code === 200) {
          console.log(res.result);
        }
      });
    });
  }
  destroyed() {
    (<any>this).$bus.$off("searchResult");
  }

  itemClick(index: number) {
    this.currentSearchType = this.searchType[index];
  }
}
</script>

<style lang="less" scoped>
.search-result {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: white;
}
</style>