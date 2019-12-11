<template>
  <div class="hot-search-list">
    <h3 class="title">热搜榜</h3>
    <div class="hot-list">
      <div class="list-item" v-for="(item,index) of hotsearch" :key="index">
        <span class="ordinal">{{ index+1 }}</span>
        <div class="info">
          <p>{{ item.searchWord }}</p>
          <p>{{ item.content }}</p>
        </div>
        <span class="score">{{ item.score }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class HotSearchList extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  hotsearch!: object[];
}
</script>

<style lang="less" scoped>
.hot-search-list {
}
</style>