<template>
  <div class="search-history" v-if="historyArr.length!=0">
    <div class="head clearfix">
      <h3 class="fl title">历史记录</h3>
      <span class="fa-trash-o fr" @click="remove"></span>
    </div>
    <scroll-bar class="scroll-bar" direction="horizontal">
      <div class="history-content">
        <div
          class="items"
          v-for="item of historyArr"
          :key="item"
          @click="goSearchResult(item)"
        >{{ item }}</div>
      </div>
    </scroll-bar>
  </div>
</template>

<script lang='ts'>
import scrollBar from "components/common/scroll/scroll.vue";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    scrollBar
  }
})
export default class SearchHistory extends Vue {
  get historyArr() {
    return this.$store.state.searchHistory;
  }

  remove() {
    this.$store.commit("removeHistorySearch");
  }

  goSearchResult(keyWorld: string) {
    this.$store.commit("changeSearchKey", keyWorld);
    this.$router.push(`/searchresult?keywords=${keyWorld}`);
  }
}
</script>

<style lang="less" scoped>
.search-history {
  padding: 10px 0 20px;
  .fa-trash-o {
    color: #999;
    font-size: 16px;
  }
  .scroll-bar {
    margin-top: 10px;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
    display: flex; // 重要的display：flex
    .history-content {
      display: flex;
      .items {
        flex: 1;
        white-space: nowrap;
        padding: 2px 10px;
        display: inline-block;
        text-align: center;
        border-radius: 20px;
        background-color: rgba(0, 0, 0, 0.1);
        margin-left: 10px;
      }
    }
  }
}
</style>