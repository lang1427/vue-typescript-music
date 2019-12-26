<template>
  <div>
    <scroll
      v-if="singleList.length!=0"
      class="single-scroll"
      ref="singleScroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <div class="single">
        <div class="head">
          <div class="play-all">
            <span class="fa-play-circle-o"></span> 播放全部
          </div>
          <div class="checkbox">
            <span class="fa-list-ul"></span> 多选
          </div>
        </div>
        <div class="body">
          <div class="list-items" v-for="(item,index) of singleList" :key="index">
            <p class="name">{{ item.name }}</p>
            <p class="desc">{{ item.artists[0].name }} - {{ item.album.name }}</p>
          </div>
        </div>
      </div>
    </scroll>
    <loading v-else />
  </div>
</template>

<script lang='ts'>
import scroll from "components/common/scroll/scroll.vue";
import { loadingMixin } from "@/utils/mixin";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    scroll
  },
  mixins: [loadingMixin]
})
export default class Single extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  singleList!: object[];
  timer: any = null;

  mounted() {
    (<any>this).$bus.$on("finishPullUp", () => {
      this.$refs.singleScroll && (<any>this.$refs.singleScroll).finishPullUp();
      this.$refs.singleScroll && (<any>this.$refs.singleScroll).refresh();
    });
  }
  destroyed() {
    (<any>this).$bus.$off("finishPullUp");
  }

  pullingUp() {
    this.$emit("pullingUp", 1);
    // (<any>this.$refs.singleScroll).finishPullUp();
  }
}
</script>

<style lang="less" scoped>
.single-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 0px;
  overflow: hidden;
  .single {
    padding: 0 10px;
    .head {
      display: flex;
      height: 50px;
      line-height: 50px;
      .play-all {
        flex: 1;
        font-size: 16px;
        .fa-play-circle-o {
          font-size: 18px;
        }
      }
      .checkbox {
        width: 60px;
        color: #999;
        .fa-list-ul {
          color: #999;
        }
      }
    }
    .body {
      .list-items {
        padding: 5px 0;
        // .name {
        // }
        .desc {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
</style>