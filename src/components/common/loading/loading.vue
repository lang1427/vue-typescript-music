<template>
  <div class="loading">
    <div>
      <img src="./loading.gif" />
      <span class="text">正在努力加载中...</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {}
</script>

<style lang="less" scoped>
.loading {
  padding-top: 35px;
  text-align: center;
  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .text {
    padding-left: 5px;
    font-size: 12px;
    color: #d33a31;
  }
}
</style>
