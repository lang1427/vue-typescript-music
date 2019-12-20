<template>
  <div class="radio">暂无内容</div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Radio extends Vue {}
</script>

<style lang="less" scoped>
.radio {
  text-align: center;
  margin-top: 30px;
  color: #999;
}
</style>