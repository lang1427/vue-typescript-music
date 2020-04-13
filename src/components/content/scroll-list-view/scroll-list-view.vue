<template>
  <div>
    <div v-if="data.length != 0" class="scroll-list-view">
      <scroll ref="scrollListview" class="list-view" :probeType="3" @scroll="scroll">
        <div class="content">
          <ul>
            <li v-for="group of data" :key="group.title" ref="listGroup">
              <h2 class="group-title">{{ group.title }}</h2>
              <ul>
                <li
                  class="group-items"
                  v-for="item of group.items"
                  :key="item.id"
                  @click="selector(item.id)"
                >
                  <img v-lazy="item.imgUrl" class="items-img" alt />
                  <span class="items-name">{{ item.name }}</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!-- 右侧导航部分,
        放在scroll插槽中，设置position，不对content造成影响同时还可以固定在右侧且不能滑动-->
        <div class="list-shortcut">
          <ul>
            <li
              class="shortcut-items"
              @touchstart="touchStart"
              @touchmove.stop.prevent="touchMove"
              v-for="(item, index) of shortcurList"
              :key="index"
              :data-index="index"
              :class="{ 'items-active': currentIndex === index }"
            >{{ item }}</li>
          </ul>
        </div>
      </scroll>
    </div>
    <loading style="margin-top:100px;" v-show="$store.state.loadingShow" />
  </div>
</template>

<script lang="ts">
interface ITouch {
  y1: number;
  y2: number;
  anchorIndex: string;
}
interface IPosition {
  x: number;
  y: number;
}

const ANCHOR_HEIGHT = 20;

import scroll from "components/common/scroll/scroll.vue";
import { getData } from "@/utils/dom";
import { loadingMixin } from "@/utils/mixin";

import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    scroll
  },
  mixins: [loadingMixin]
})
export default class scrollListView extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  data!: object[];

  currentIndex: number = 0;
  scrollY: number = -1;
  touch: ITouch = {
    y1: 0,
    y2: 0,
    anchorIndex: ""
  };
  listHeight: number[] = []; // 用于存储每个类型对应的高度
  get shortcurList() {
    return this.data.map(item => {
      return (item as any).title.substr(0, 1);
    });
  }

  selector(id: number) {
    this.$router.push("/singer/detail/" + id);
  }

  /** 滑动右侧导航，实现主题内容联动效果 Start */
  touchStart(e: TouchEvent) {
    let anchorIndex = getData(e.target as HTMLElement, "index"); // 获取当前开始移动的元素的自定义属性值===index
    this.touch.y1 = e.touches[0].pageY; // 获取当前移动元素的pageY
    this.touch.anchorIndex = <string>anchorIndex;
    this._scrollTo(anchorIndex as any); // 滚动到指定当前的元素中
  }
  touchMove(e: TouchEvent) {
    this.touch.y2 = e.touches[0].pageY;
    let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0;
    let anchorIndex = parseInt(this.touch.anchorIndex) + delta;
    this._scrollTo(anchorIndex);
  }
  _scrollTo(index: string | number) {
    if (!index && index != 0) {
      return;
    }
    if (index < 0) {
      index = 0;
    } else if (index > this.listHeight.length - 2) {
      index = this.listHeight.length - 2;
    }
    this.scrollY = -this.listHeight[<number>index];
    (this.$refs.scrollListview as any).scrollToElement(
      (<any>this.$refs).listGroup[index],
      0
    );
  }
  /** 滑动右侧导航，实现主题内容联动效果 End */

  /** 滑动主题内容，右侧导航联动效果 Start */
  scroll(position: IPosition) {
    this.scrollY = position.y;
  }
  /**计算高度 clientHeight（实际内容的高度）  设置好了每个li的高度为50px；并不会因为图片没有被加载，高度计算不正确 */
  calcHeight() {
    const list: any = this.$refs.listGroup;
    let height = 0;
    this.listHeight.push(height); // 初始 0
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      height += item.clientHeight;
      this.listHeight.push(height);
    }
  }
  /** 监听Prop中的data是否传入了值，当传入了值时，设置好listHeight：每个类型的高度 */
  @Watch("data")
  changeData() {
    setTimeout(() => {
      this.calcHeight();
    }, 20);
  }
  /** 监听scrollY 滚动的距离，设置 当滚动的距离在某个范围内的currentIndex的值 */
  @Watch("scrollY")
  changeScrollY(newVal: number) {
    const listHeight = this.listHeight;
    /** 最上方 下拉滑动，激活 第一个 类型 热门 */
    if (newVal > 0) {
      this.currentIndex = 0;
      return;
    }
    /** 上拉 取对应类型 激活currentIndex */

    for (let i = 0; i < listHeight.length - 1; i++) {
      let height1 = listHeight[i];
      let height2 = listHeight[i + 1];
      // 如果滚动的距离 在当前类型的高度与下一个类型之前的高度 则设置 对应的 currentIndex
      if (-newVal >= height1 && -newVal < height2) {
        this.currentIndex = i;
        return;
      }
    }
    // 滑动到最后
    this.currentIndex = this.listHeight.length - 2;
  }
  /** 滑动主题内容，右侧导航联动效果 End */
}
</script>

<style lang="less" scoped>
.scroll-list-view {
  position: fixed;
  top: 50px;
  bottom: 0;
  width: 100%;

  .list-view {
    position: relative;
    width: 100%;
    height: 100%;
    background: #f2f3f4;
    .group-title {
      color: white;
      background-color: rgba(0, 0, 0, 0.1);
      font-size: 12px;
      padding: 2px 6px;
    }
    .group-items {
      display: flex;
      padding: 5px 5px;
      align-items: center;
      border-bottom: 1px solid #dedede;
      &:last-of-type {
        border-bottom: none;
      }
      .items-img {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
        }
      }
      .items-name {
        padding-left: 8px;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    right: 0;
    top: 30px;
    .shortcut-items {
      font-size: 12px;
      color: #666;
      line-height: 1;
      padding: 5px 5px;
      &.items-active {
        color: @klColor;
      }
    }
  }
}
</style>
