<template>
  <div class="comment-footer">
    <div class="input-box">
      <input
        type="text"
        placeholder="随乐而起，有感而发"
        ref="commentInput"
        v-model="commentVal"
        @focus="$parent.testLogin()"
      />
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="send-btn" @click="send">
      <span class="text" :class="commentVal.length != 0 ? 'yes' : '' ">发送</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class CommentFooter extends Vue {
  private commentVal: string = "";
  private replyID: number = -1;
  created() {}
  mounted() {
    (<any>this).$bus.$on("replyComment", (rid: number, name: string) => {
      (this.$refs.commentInput as HTMLInputElement) &&
        (this.$refs.commentInput as HTMLInputElement).focus();
      this.$refs.commentInput
        ? ((this.$refs.commentInput as HTMLInputElement).placeholder =
            "回复" + name)
        : null;
      this.replyID = rid;
    });
  }

  send() {
    if (this.commentVal.trim() === "") {
      return false;
    }
    let operationType = 1;
    if (
      (this.$refs.commentInput as HTMLInputElement).placeholder !==
      "随乐而起，有感而发"
    ) {
      operationType = 2;
    }
    this.$emit(
      "sendComment",
      operationType,
      this.commentVal,
      this.replyID !== -1 ? this.replyID : null
    );
    this.commentVal = "";
    this.replyID = -1;
    this.$refs.commentInput
      ? ((this.$refs.commentInput as HTMLInputElement).placeholder =
          "随乐而起，有感而发")
      : null;
  }
}
</script>
<style scoped lang='less'>
.comment-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  align-items: center;
  background: rgb(249, 249, 249);
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background-color: #ccc;
    transform: scaleY(0.5);
  }
  .input-box {
    margin: 0 8px;
    flex: 1;
    position: relative;
    overflow: hidden;
    background: white;
    input {
      width: 95%;
      height: 30px;
      padding-left: 6px;
      border: none;
      background: white;
      outline: none;
    }
    span {
      position: absolute;
      &:nth-of-type(1) {
        width: 100%;
        height: 2px;
        background: -webkit-linear-gradient(left, transparent, #03e9f4);
        left: -100%;
        top: 0;
        animation: line1 1s linear infinite;
      }
      &:nth-of-type(2) {
        height: 100%;
        width: 2px;
        background: -webkit-linear-gradient(top, transparent, #03e9f4);
        top: -100%;
        right: 0;
        animation: line2 1s 0.35s linear infinite;
      }
      &:nth-of-type(3) {
        width: 100%;
        height: 2px;
        background: -webkit-linear-gradient(left, transparent, #03e9f4);
        left: 100%;
        bottom: 0;
        animation: line3 1s 0.45s linear infinite;
      }
      &:nth-of-type(4) {
        height: 100%;
        width: 2px;
        background: -webkit-linear-gradient(top, transparent, #03e9f4);
        top: 100%;
        left: 0px;
        animation: line4 1s 0.8s linear infinite;
      }
    }
  }
  .send-btn {
    width: 50px;
    margin-left: 15px;
    .text {
      color: #999;
      font-size: 12px;
      &.yes {
        color: #333;
        font-weight: 580;
      }
    }
  }
}
@keyframes line1 {
  50%,
  100% {
    left: 100%;
  }
}
@keyframes line2 {
  50%,
  100% {
    top: 100%;
  }
}
@keyframes line3 {
  50%,
  100% {
    left: -100%;
  }
}
@keyframes line4 {
  50%,
  100% {
    top: -100%;
  }
}
</style>