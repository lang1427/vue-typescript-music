<template>
  <div class="album-list">
    <slot name="top"></slot>
    <div v-for="item of albumList" :key="item.id">
      <album-list-items :albumListItems="item" />
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang="ts">
import albumListItems from "./album-list-items.vue";
export default {
  // @Prop({
  //   default() {
  //     return []
  //   }
  // })
  // albumList!: object[]
  props: {
    albumList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="less" scoped>
.album-list {
  padding: 0 10px;
}
</style>
