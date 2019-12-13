<template>
  <div class="search-result">
    <search-result-bar :searchContent="searchValue" />
    <div style="padding-top:50px"></div>
    <nav-bar></nav-bar>
  </div>
</template>

<script lang='ts'>
interface ISearchResult {
  code: number;
  result: object;
  songs: object;
}
import searchResultBar from "./childComp/topbar.vue";
import navBar from "./childComp/navbar.vue";
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