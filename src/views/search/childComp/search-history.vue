<template>
  <div class="search-history" v-if="historyArr.length!=0">
    <div class="head clearfix">
      <h3 class="fl title">历史记录</h3>
      <span class="fa-trash-o fr"></span>
    </div>
    <div class="history-content">
      <span class="items" v-for="item of historyArr" :key="item">{{ item }}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SearchHistory extends Vue {
  get historyArr() {
    return this.$store.state.searchHistory;
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
  .history-content {
    padding-top: 10px;
    .items {
      padding: 2px 10px;
      display: inline-block;
      text-align: center;
      border-radius: 20px;
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>