<template>
  <div class="search-result">
    <search-result-bar :searchContent="searchValue" />
    <result-list :resultlist="searchResultList" />
  </div>
</template>

<script lang='ts'>
interface ISearchResult {
  code: number;
  result: object;
}
import searchResultBar from "./childComp/topbar.vue";
import resultList from "./childComp/result-list.vue";
import { searchResultData } from "@/service/search";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    searchResultBar,
    resultList
  }
})
export default class SearchResult extends Vue {
  searchValue: string = "";
  searchResultList: object = {};

  created() {
    (<any>this).$bus.$on("searchResult", (keywords: string) => {
      this.searchValue = keywords;
      searchResultData(keywords).then((res: ISearchResult) => {
        if (res.code === 200) {
          this.searchResultList = res.result;
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