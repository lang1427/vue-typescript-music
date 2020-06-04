<template>
  <div>
    <scroll class="single-scroll" ref="singleScroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <div>
        <div class="single" v-if="songlist.length!=0">
          <div class="head">
            <div class="play-all">
              <span @click="play(0)">
                <span class="fa-play-circle-o"></span> 播放全部
              </span>
            </div>
            <div class="checkbox">
              <span class="fa-list-ul"></span> 多选
            </div>
          </div>
          <div class="body">
            <div
              class="list-items"
              v-for="(item,index) of songs"
              :key="index"
              @click="playSingle(item)"
            >
              <p class="name">{{ item.songsName }}</p>
              <p class="desc">{{ item.singerName }}</p>
            </div>
          </div>
        </div>
        <loading v-show="$store.state.loadingShow" />
      </div>
    </scroll>
  </div>
</template>

<script lang='ts'>
import scroll from "components/common/scroll/scroll.vue";
import { SongsInfoClass } from "@/conf/songsInfo";
import { loadingMixin,playMixin, singlePlayMixin } from "@/utils/mixin";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    scroll
  },
  mixins: [loadingMixin,playMixin, singlePlayMixin]
})
export default class Single extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  songlist!: [];
  timer: any = null;

  get songs(){
    let arr = []
    for (const item of this.songlist) {
      arr.push(new SongsInfoClass(item))
    }
    return arr
  }

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