<template>
  <div>
    <scroll
      v-if="albumList.length!=0"
      class="album-scroll"
      ref="albumScroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <div class="album">
        <div class="list-items" v-for="(item,index) of albumList" :key="index">
          <div class="items-img">
            <img :src="item.blurPicUrl" @load="imgLoad" />
          </div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="desc">{{ item.artist.name }} {{ item.publishTime | newTime }}</div>
          </div>
        </div>
      </div>
    </scroll>
    <loading v-else />
  </div>
</template>

<script lang='ts'>
import scroll from "components/common/scroll/scroll.vue";

import { formatDate } from "@/utils/formatDate";
import { loadingMixin } from "@/utils/mixin";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    scroll
  },
  mixins: [loadingMixin],
  filters: {
    newTime(date: number): string {
      let newDate = new Date(date);
      return formatDate(newDate, "yyyy.M.d");
    }
  }
})
export default class Album extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  albumList!: object[];

  imgLoad() {
    this.$refs.albumScroll && (this.$refs.albumScroll as any).refresh();
  }

  mounted() {
    (<any>this).$bus.$on("finishPullUp", () => {
      this.$refs.albumScroll && (<any>this.$refs.albumScroll).finishPullUp();
      this.$refs.albumScroll && (<any>this.$refs.albumScroll).refresh();
    });
  }
  destroyed() {
    (<any>this).$bus.$off("finishPullUp");
  }

  pullingUp() {
    this.$emit("pullingUp", 4);
  }
}
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
    .list-items {
      padding: 5px 0;
      display: flex;
      align-items: center;
      .items-img {
        width: 60px;
        img {
          width: 100%;
          height: 60px;
          border-radius: 50%;
          display: block;
        }
      }
      .info {
        flex: 1;
        margin-left: 10px;
        // .name {
        // }
        .desc {
          padding-top: 3px;
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>