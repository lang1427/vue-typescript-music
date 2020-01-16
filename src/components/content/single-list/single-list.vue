<template>
  <div class="single-list-view" v-if="singleList.length!=0">
    <slot name="top"></slot>
    <div class="single-list">
      <div v-for="(item,index) of singleList" :key="index" class="single-list-items">
        <single-list-items :listItems="item" :order="index+1" />
      </div>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang='ts'>
import singleListItems from "./single-list-items.vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    singleListItems
  }
})
export default class SingleList extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  singleList!: object;
}
</script>

<style lang="less" scoped>
</style>