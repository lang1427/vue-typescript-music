<template>
  <div class="search">
    <search-tab />
    <search-history />
    <hot-search-list :hotsearch="hotSearchListData" />
  </div>
</template>

<script lang='ts'>
import searchTab from "./childComp/search-tab.vue";
import searchHistory from "./childComp/search-history.vue";
import hotSearchList from "./childComp/hot-search-list.vue";

import { hotSearch } from "@/service/search";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    searchTab,
    searchHistory,
    hotSearchList
  }
})
export default class Search extends Vue {
  private hotSearchListData: object[] = [];

  created() {
    this.getHotSearch();
  }

  async getHotSearch() {
    let res = await hotSearch();
    if (res.code === 200) {
      this.hotSearchListData = res.data;
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  background-color: white;
  padding: 0 10px;
}
</style>