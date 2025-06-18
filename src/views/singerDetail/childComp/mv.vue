<template>
  <div class="mv">
    <mv-list-comp :mvList="mvList">
      <div v-show="mvList.hasMore" class="hasMore" slot="bottom">
        {{ message }}
      </div>
    </mv-list-comp>
  </div>
</template>

<script lang="ts">
import mvListComp from "@/components/content/mv-list/mv-list.vue";
import { IMv } from "@/components/content/mv-list/mv-list.vue";
export default {
  components: {
    mvListComp,
  },
  props: {
    mvList: {
      type: Object as () => IMv,
      default: () => {},
    },
  },
  computed: {
    message() {
      return `很遗憾，仅能浏览以上${
        this.mvList.mvs && this.mvList.mvs.length
      }条数据`;
    },
  },
};
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
