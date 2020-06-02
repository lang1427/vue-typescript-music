<template>
  <div class="single-list-items">
    <div class="order">{{ order }}</div>
    <div class="info">
      <p class="name">{{ listItems.songsName }}</p>
      <p class="desc">{{ listItems.singerName }}</p>
    </div>
    <div class="operation" @click.stop="openOperation(listItems)">
      <span class="fa-ellipsis-v"></span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class SingleListItems extends Vue {
  @Prop({
    default() {
      return {};
    }
  })
  listItems!: any;
  @Prop() order!: number;

  openOperation(obj: object) {
    (<any>this).$bus.$emit("openOperation", obj);
  }
}
</script>

<style lang="less" scoped>
.single-list-items {
  display: flex;
  align-items: center;
  .order {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .info {
    flex: 1;
    .desc {
      font-size: 12px;
      color: #999;
    }
  }
  .operation {
    width: 50px;
    text-align: center;
    span {
      display: block;
      width: 100%;
      color: #999;
    }
  }
}
</style>