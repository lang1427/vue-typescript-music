<template>
  <div class="mv">
    <mv-list :mvList="mvList">
      <div v-show="mvList.hasMore" class="hasMore" slot="bottom">{{ message }}</div>
    </mv-list>
  </div>
</template>

<script lang='ts'>
interface IMv {
  mvs: object[];
}
import mvList from "components/content/mv-list/mv-list.vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    mvList
  }
})
export default class Mv extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  mvList!: IMv;

  get message() {
    return `很遗憾，仅能浏览以上${this.mvList.mvs &&
      this.mvList.mvs.length}条数据`;
  }
}
</script>

<style lang="less" scoped>
.mv {
  background-color: white;
  .hasMore {
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
</style>