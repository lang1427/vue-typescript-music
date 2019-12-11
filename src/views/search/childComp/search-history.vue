<template>
  <div class="search-history" v-if="false">
    <div class="head clearfix">
      <span class="fl">历史记录</span>
      <span class="fr"></span>
    </div>
    <div class="history-content">
      <span></span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SearchHistory extends Vue {}
</script>

<style lang="less" scoped>
.search-history {
  margin-top: 15px;
}
</style>