<template>
  <div class="mv-list">
    <slot name="top"></slot>
    <div v-for="item of mvList.mvs" :key="item.id">
      <mv-list-items :mvListItems="item" />
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang="ts">
import mvListItems from "./mv-list-items.vue";
export interface IMv {
  hasMore: boolean;
  mvs: object[];
}
export default {
  components: {
    mvListItems,
  },
  props: {
    mvList: {
      type: Object as () => IMv,
      default: () => {},
    },
  },
};
</script>

<style lang="less" scoped>
.mv-list {
  padding: 0 10px;
}
</style>
