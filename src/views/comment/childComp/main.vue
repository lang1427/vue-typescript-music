<template>
  <div class="comment-main" v-if="commentData.length!==0">
    <scroll-bar
      class="scroll-wrapper"
      ref="commentScroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <div class="scroll-content">
        <div class="list-items" v-for="comment of commentData" :key="comment.commentId">
          <div class="user-baseinfo">
            <div class="avatar">
              <img :src="comment.userAvatar" alt />
            </div>
            <div class="base-info">
              <p class="name">{{ comment.userName }}</p>
              <p class="time">{{ comment.commentTime | handleTime }}</p>
            </div>
            <div class="liked">
              <span
                @click="setLikeComment(comment.commentId)"
                :class="comment.commentLiked ? 'fa-thumbs-o-up liked-active' : 'fa-thumbs-o-up' "
              >{{ comment.commentLikedCount !== 0 ? comment.commentLikedCount : '' }} &nbsp;&nbsp;</span>
            </div>
          </div>
          <div
            class="comment-content"
            v-longpress="{'methods':longpressDialog,'params':{content:comment.commentContent,userId:comment.userId,commentId:comment.commentId}}"
            @click="!longpress && reply(comment.commentId,comment.userName)"
          >{{ comment.commentContent }}</div>
          <div class="reply">
            <template v-for="reply of replyData">
              <div :key="reply.commentId" v-if="reply.parentCommentId === comment.commentId">
                <span class="name">{{ reply.userName }} :&nbsp;</span>
                <span>{{ reply.commentContent }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </scroll-bar>

    <comment-dialog :dialogShow="isDialogShow" @hide="resetDialog">
      <div class="dialog-box">
        <div @click="copyComment">复制评论</div>
        <div v-if="$store.state.account.account.id === commentUserID" @click="removeComment">删除评论</div>
      </div>
    </comment-dialog>
    <!-- 复制的值 type不能是hidden-->
    <input
      type="text"
      style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;"
      id="copyinput"
    />
  </div>
</template>

<script lang='ts'>
import "@/utils/longpress";
import moment from "moment";
import "moment/locale/zh-cn";
import scrollBar from "@/components/common/scroll/scroll.vue";
import commentDialog from "@/components/common/kl-dialog/kl-dialog.vue";
import { IComment, likeComment } from "@/service/comment";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component({
  components: {
    scrollBar,
    commentDialog
  },
  filters: {
    handleTime(oldTime: number) {
      moment().locale("zh-cn");
      let date = moment(oldTime).format("YYYY-MM-DD HH:mm:ss");
      return moment(date).calendar();
    }
  }
})
export default class CommentMain extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  commentList!: object[];

  private longpress: boolean = false; // 用于阻止长按事件与点击事件冲突
  private isDialogShow: boolean = false;
  private content: string = ""; // 用于保存长按的文本内容  （针对于复制评论内容操作）
  private commentUserID: number = -1; // 用于保存长按的用户id  （针对于是否可删除评论操作）
  private commentContentId: number = -1; // 评论内容id （针对于是否可删除评论操作）

  created() {}

  get commentData() {
    return this.commentList.filter(item => {
      return (<IComment>item).parentCommentId === 0;
    });
  }
  get replyData() {
    return this.commentList.filter(item => {
      return (<IComment>item).parentCommentId !== 0;
    });
  }

  async setLikeComment(cid: number) {
    (<any>this).$parent.testLogin();

    let domEvent = event;
    let res = await likeComment(
      parseInt(<string>this.$route.query.id),
      cid,
      // 这里不能采用数据的commentLiked属性进行判断是点赞还是取消点赞  需要通过类样式进行判断
      (<any>domEvent).target.classList.contains("liked-active") ? 0 : 1,
      (<any>this).$parent.commentType
    );
    if (res.code === 200) {
      if (!(<any>domEvent).target.classList.contains("liked-active")) {
        (<any>domEvent).target.classList.add("liked-active");
        if ((<any>domEvent).target.innerHTML == "") {
          (<any>domEvent).target.innerHTML = 1;
        } else {
          (<any>domEvent).target.innerHTML =
            (<any>domEvent).target.innerHTML * 1 + 1;
        }
        // 此方案不行  当上拉加载更多时数据将会重新被赋值
        // this.$set(this.commentData, index, {
        //   ...this.commentData[index],
        //   commentLiked: true,
        //   commentLikedCount:
        //     (this.commentData[index] as any).commentLikedCount + 1
        // });
        // this.$forceUpdate();
      } else {
        (<any>domEvent).target.classList.remove("liked-active");
        (<any>domEvent).target.innerHTML -= 1;
        // 因为这里的数据不是响应式了，所以点赞数量=0的判断在这里不起效，需手动设置为空字符串
        if ((<any>domEvent).target.innerHTML == 0) {
          (<any>domEvent).target.innerHTML = "";
        }
        // this.$set(this.commentData, index, {
        //   ...this.commentData[index],
        //   commentLiked: false,
        //   commentLikedCount:
        //     (this.commentData[index] as any).commentLikedCount - 1
        // });
        // this.$forceUpdate();
      }
    }
  }

  longpressDialog(obj: any) {
    this.longpress = true;
    this.isDialogShow = true;
    this.content = obj.content;
    this.commentUserID = obj.userId;
    this.commentContentId = obj.commentId;
  }
  reply(replyID: number, userName: string) {
    (<any>this).$bus.$emit("replyComment", replyID, userName);
  }
  pullingUp() {
    this.$emit("pullingUp");
  }
  copyComment() {
    let input = document.getElementById("copyinput");
    (<HTMLInputElement>input).value = this.content;
    (<HTMLInputElement>input).select();
    document.execCommand("copy");
    this.resetDialog();
  }
  removeComment() {
    (<any>this).$parent.setOperationComment(0, null, this.commentContentId);
    this.resetDialog();
  }
  resetDialog() {
    this.longpress = false;
    this.isDialogShow = false;
    this.content = "";
    this.commentUserID = -1;
  }

  @Watch("commentList", { immediate: true })
  changeCommentList() {
    this.$refs.commentScroll && (this as any).$refs.commentScroll.refresh();
  }
}
</script>
<style scoped lang='less'>
.comment-main {
  .scroll-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 72px;
    bottom: 40px;
    overflow: hidden;
    .scroll-content {
      .list-items {
        padding: 8px;
        position: relative;
        &:last-child {
          &::after {
            background-color: transparent;
          }
        }
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 1px;
          background-color: #ccc;
          transform: scaleY(0.5);
        }
        .user-baseinfo {
          display: flex;
          height: 35px;
          align-items: center;
          .avatar {
            width: 35px;
            padding-right: 8px;
            img {
              border-radius: 50%;
              display: block;
              width: 100%;
            }
          }
          .base-info {
            flex: 1;
            // .name {
            // }
            .time {
              font-size: 12px;
              color: #999;
              transform: scale(0.9);
              transform-origin: left;
            }
          }
          .liked {
            width: 80px;
            text-align: right;
            .liked-active {
              color: @klColor;
            }
            span {
              color: #666;
              font-size: 12px;
            }
          }
        }
        .comment-content {
          display: flex;
          padding: 5px;
          text-indent: 2em;
        }
        .reply {
          span {
            font-size: 13px;
          }
          .name {
            color: #d7c;
          }
        }
      }
    }
  }
  .dialog-box {
    width: 200px;
    div {
      line-height: 40px;
      text-align: center;
    }
  }
}
// 将font-awesome 的 fa-thumbs-o-u（竖大拇指）字体图标 改成 after 显示
.fa-thumbs-o-up:before {
  content: "";
}
.fa-thumbs-o-up:after {
  content: "  \f087";
}
</style>