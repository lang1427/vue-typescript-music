<template>
  <div class="scroll-nav-bar">
    <scroll class="scroll-navbar-list" ref="scrollNavBar" direction="horizontal">
      <div class="list-wrapper" ref="listItems">
        <div
          class="list-item"
          :class="{'item-active':currentIndex===index}"
          v-for="(item,index) of text"
          :key="item"
          @click="changeHandler(index)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </scroll>
    <div v-for="(item,index) of text" :key="index" v-show="index === currentIndex">
      <slot :name="item"></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import scroll from "components/common/scroll/scroll.vue";

import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    scroll
  }
})
export default class scrollNavBar extends Vue {
  @Prop({
    default() {
      return [];
    },
    required: true
  })
  text!: string | number[];
  @Prop() private active!: boolean;

  currentIndex: number = 0;

  /**此两生命周期并非封装组件库的相关代码，而是搜索结果综合类型跳转到其他类型页面的功能代码 */
  mounted() {
    (<any>this).$bus.$on("goMarryView", (index: number) => {
      this.changeHandler(index);
    });
  }
  destroyed() {
    (<any>this).$bus.$off("goMarryView");
  }

  changeHandler(index: number) {
    this.currentIndex = index;
    this.$emit("changeHandler", index);
    this.adjust();
  }

  /** 调整距离至中间 */
  adjust() {
    // 获取scroll可视区域的宽度
    const clientWidth = (this.$refs.scrollNavBar as Vue).$el["clientWidth"]; // 375
    // 获取可滚动区域的宽度
    const scrollWidth = (this.$refs.listItems as any)["clientWidth"]; // 924
    // 计算最小的移动距离: 可视区域的宽度 - 可滚动区域的宽度 || 0
    const minTranslate = Math.min(0, clientWidth - scrollWidth); // -549
    // scroll 可视区域宽度的中间值
    const middleTranslate = clientWidth / 2; // 175
    // 获取所有经过遍历text数组的div元素
    const items = (<HTMLDivElement>this.$refs.listItems).children;
    let size: number = 0;
    (this.text as []).every((text: string | number[], index: number) => {
      if (this.currentIndex === index) {
        size += items[index]["clientWidth"] / 2;
        return false;
      }
      size += items[index]["clientWidth"];
      return true;
    });
    // 计算得到需要滚动的X的值：可视区域宽度的中间值 - 每一个text元素的宽度的一半
    let translate = middleTranslate - size;
    translate = Math.max(minTranslate, Math.min(0, translate));
    (<any>this.$refs.scrollNavBar).scrollTo(translate, 0, 300);
  }
}
</script>

<style lang="less" scoped>
.scroll-nav-bar {
  .scroll-navbar-list {
    height: 40px;
    line-height: 40px;
    // background-color: #dede;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    display: flex; // 重要的display：flex
    .list-wrapper {
      display: flex;
      .list-item {
        flex: 1;
        white-space: nowrap;
        padding: 0 15px;
        cursor: pointer;
        &.item-active {
          span {
            color: @klColor;
          }
          border-bottom: 2px solid @klColor;
        }
      }
    }
  }
}
</style>