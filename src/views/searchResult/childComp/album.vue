<template>
  <div>
    <scroll
      class="album-scroll"
      ref="albumScroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <div>
        <div class="album" v-if="albumList.length != 0">
          <album-list :albumList="albumList" />
        </div>
        <loading v-show="$store.state.loadingShow" />
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
import scroll from "components/common/scroll/scroll.vue";
import albumList from "components/content/album-list/album-list.vue";

import { formatDate } from "@/utils/formatDate";
import { loadingMixin } from "@/utils/mixin";

// @Component({
//   components: {
//     scroll,
//     albumList
//   },
//   mixins: [loadingMixin]
// })
export default {
  // @Prop({
  //   default() {
  //     return [];
  //   }
  // })
  // albumList!: object[];
  props: {
    albumList: {
      type: Array,
      default: () => [],
    },
  },

  mounted() {
    (<any>this).$bus.$on("finishPullUp", () => {
      this.$refs.albumScroll && (<any>this.$refs.albumScroll).finishPullUp();
      this.$refs.albumScroll && (<any>this.$refs.albumScroll).refresh();
    });
  },
  destroyed() {
    (<any>this).$bus.$off("finishPullUp");
  },
  methods: {
    pullingUp() {
      this.$emit("pullingUp", 4);
    },
  },
};
</script>

<style lang="less" scoped>
.album-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 0;
  overflow: hidden;
  .album {
    padding: 10px 10px 0;
  }
}
</style>
