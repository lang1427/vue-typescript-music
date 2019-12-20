<template>
  <div>
    <scroll v-if="singerList.length!=0" class="singer-scroll">
      <div class="singer">
        <div class="list-items" v-for="item of singerList" :key="item.id">
          <div class="items-img">
            <img :src="item.img1v1Url" alt />
          </div>
          <div class="name">{{ item.name }}</div>
          <div class="settled-in">
            <span class="fa-user-circle"></span>已入驻
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
export default class Singer extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  singerList!: object[];
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