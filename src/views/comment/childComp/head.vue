<template>
  <div class="comment-head">
    <top-bar>
      <div slot="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div slot="center" class="title">{{ title }}</div>
    </top-bar>
    <div class="category">
      <div class="title">评论区</div>
      <div class="items">
        <span :class=" isNew ? 'comment-active' : '' " @click="changeType(true)">最新</span>
        <span :class=" isNew ? '' : 'comment-active' " @click="changeType(false)">最热</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import topBar from "@/components/common/navbar/navbar.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    topBar
  }
})
export default class CommentHead extends Vue {
  private isNew: boolean = true;

  created() {}

  get title() {
    return `评论（${(<any>this).$parent.commentTotal}）`;
  }

  changeType(val:boolean){
    this.isNew = val
    this.$emit('changeType',val)
  }
  back() {
    this.$router.back();
  }
}
</script>
<style scoped lang='less'>
.comment-head {
  position: relative;
  z-index: 233;
  background: white;
  .back {
    font-size: 18px;
  }
  .title {
    font-weight: 580;
  }
  .category {
    padding: 0 10px 3px;
    display: flex;
    //   0.5像素 边框
    position: relative;
    &::after {
      content: "  ";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #ccc;
      /* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
      transform: scaleY(0.5);
    }
    .title {
      flex: 1;
      font-size: 12px;
    }
    .items {
      width: 150px;
      text-align: right;
      span {
        color: #999;
        font-size: 12px;
        &.comment-active {
          color: #333;
          font-weight: 580;
        }
        &:first-child {
          margin-right: 8px;
        }
      }
    }
  }
}
</style>