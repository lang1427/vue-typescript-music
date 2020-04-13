<template>
  <div>
    <scroll class="singer-scroll" ref="singerScroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <div>
        <div class="singer" v-if="singerList.length != 0">
          <div
            class="list-items"
            v-for="(item, index) of singerList"
            :key="index"
            @click="goSingerDetail(item.id)"
          >
            <div class="items-img">
              <img v-lazy="item.img1v1Url" @load="imgLoad" />
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="settled-in">
              <span class="fa-user-circle"></span>已入驻
            </div>
          </div>
        </div>
        <loading v-show="$store.state.loadingShow" />
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
import scroll from "components/common/scroll/scroll.vue";
import { loadingMixin } from "@/utils/mixin";

import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    scroll
  },
  mixins: [loadingMixin]
})
export default class Singer extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  singerList!: object[];

  mounted() {
    (<any>this).$bus.$on("finishPullUp", () => {
      this.$refs.singerScroll && (<any>this.$refs.singerScroll).finishPullUp();
      this.$refs.singerScroll && (<any>this.$refs.singerScroll).refresh();
    });
  }
  destroyed() {
    (<any>this).$bus.$off("finishPullUp");
  }

  goSingerDetail(id: number) {
    this.$router.push("/singer/detail/" + id);
  }

  imgLoad() {
    this.$refs.singerScroll && (this.$refs.singerScroll as any).refresh();
  }

  pullingUp() {
    this.$emit("pullingUp", 3);
  }
}
</script>

<style lang="less" scoped>
.singer-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 0px;
  overflow: hidden;
  .singer {
    padding: 10px 10px 0;
    .list-items {
      display: flex;
      align-items: center;
      padding: 5px 0;
      .items-img {
        width: 60px;
        img {
          border-radius: 50%;
          width: 100%;
          height: 60px;
          display: block;
        }
      }
      .name {
        flex: 1;
        margin-left: 10px;
      }
      .settled-in {
        width: 60px;
        font-size: 12px;
        color: #999;
        .fa-user-circle {
          color: @klColor;
          margin-right: 3px;
        }
      }
    }
  }
}
</style>
