<template>
  <div class="single-list-view" v-if="songlist.length!=0">
    <slot name="top"></slot>
    <div class="single-list">
      <div v-for="(item,index) of songlist" :key="index" class="single-list-items">
        <single-list-items @click.native="play(index)" :listItems="item" :order="index+1" />
      </div>
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang='ts'>
import { playMixin } from '@/utils/mixin'
import singleListItems from "./single-list-items.vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    singleListItems
  },
  mixins:[playMixin]
})
export default class SingleList extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  songlist!: object;
}
</script>

<style lang="less" scoped>
</style>