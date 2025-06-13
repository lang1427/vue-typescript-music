<template>
  <div v-if="tabbarInfo.length != 0">
    <div class="tab-bar" :style="[radianStyle, bgC]">
      <div
        class="tabbar-items"
        :class="{ 'items-active': currentIndex === index }"
        v-for="(item, index) of tabbarInfo"
        :key="item.title"
        @click="changeTabbar(index)"
      >
        <span class="items-title">{{ item.title }}</span>
        <span class="items-size">{{ item.size }}</span>
      </div>
    </div>
    <!-- <div v-for="(item,index) of tabbarInfo" :key="index" v-show="index===currentIndex">
      <slot :name="item.title"></slot>
    </div>-->
  </div>
</template>

<script lang="ts">
export default {
  // @Prop({
  //   default() {
  //     return [];
  //   }
  // })
  // tabbarInfo!: object[];
  // @Prop({
  //   default: false
  // })
  // isTopRadian!: boolean; // 是否显示顶部弧度
  // @Prop({
  //   default: "white"
  // })
  // bgColor!: string;

  props: {
    tabbarInfo: {
      type: Array,
      default: () => [],
    },
    isTopRadian: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: "white",
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },

  // currentIndex: number = 0;
  computed: {
    radianStyle() {
      if (this.isTopRadian) {
        return {
          borderRadius: "17px 17px 0 0",
        };
      }
    },
    bgC() {
      return {
        backgroundColor: this.bgColor,
      };
    },
  },
  methods: {
    changeTabbar(index: number) {
      this.currentIndex = index;
      this.$emit("changeTabbar", index);
    },
  },
};
</script>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  border-bottom: 1px solid #ddd;
  .tabbar-items {
    flex: 1;
    height: 30px;
    line-height: 30px;
    text-align: center;
    &.items-active {
      .items-title {
        color: @klColor;
        font-weight: 600;
        border-bottom: 2px solid @klColor;
        display: inline-block;
      }
    }
    .items-size {
      font-size: 12px;
      color: #999;
      padding-left: 3px;
    }
  }
}
</style>
