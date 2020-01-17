<template>
  <div class="mv-list">
    <slot name="top"></slot>
    <div v-for="item of mvList.mvs" :key="item.id">
      <mv-list-items :mvListItems="item" />
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang='ts'>
import mvListItems from "./mv-list-items.vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    mvListItems
  }
})
export default class mvList extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  mvList!: object[];
}
</script>

<style lang="less" scoped>
.mv-list {
  padding: 0 10px;
}
</style>