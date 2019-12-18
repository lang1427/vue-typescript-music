<template>
  <div class="search-result">
    <search-result-bar :searchContent="searchValue" />
    <div style="padding-top:50px"></div>
    <nav-bar class="navbar" :text="title" @changeHandler="itemClick">
      <section slot="综合">
        <overall :overallList="currentSearchResult" />
      </section>
      <section slot="单曲">
        <single />
      </section>
      <section slot="视频">
        <result-video />
      </section>
      <section slot="歌手">
        <singer />
      </section>
      <section slot="专辑">
        <album />
      </section>
      <section slot="歌单">
        <song-sheet />
      </section>
      <section slot="主播电台">
        <radio />
      </section>
      <section slot="用户">
        <user />
      </section>
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
import overall from "./childComp/overall.vue";
import single from "./childComp/single.vue";
import resultVideo from "./childComp/video.vue";
import singer from "./childComp/singer.vue";
import album from "./childComp/album.vue";
import songSheet from "./childComp/song-sheet.vue";
import radio from "./childComp/radio.vue";
import user from "./childComp/user.vue";

import { search } from "@/service/search";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    searchResultBar,
    navBar,
    overall,
    single,
    resultVideo,
    singer,
    album,
    songSheet,
    radio,
    user
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
  private currentSearchResult: object = {};

  created() {
    (<any>this).$bus.$on("searchResult", (keywords: string) => {
      this.searchValue = keywords;
      search(keywords, this.currentSearchType, 5, 1).then(
        (res: ISearchResult) => {
          if (res.code === 200) {
            console.log(res.result);
            this.currentSearchResult = res.result;
          }
        }
      );
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