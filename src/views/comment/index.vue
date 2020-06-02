<template>
  <div class="comment" ref="comment">
    <comment-head @changeType="changeType"></comment-head>
    <comment-main
      ref="commentMain"
      :commentList="mode ? commentNewData : commentHotData"
      @pullingUp="nextPage"
    ></comment-main>
    <comment-footer @sendComment="setOperationComment"></comment-footer>
  </div>
</template>

<script lang='ts'>
import commentHead from "./childComp/head.vue";
import commentMain from "./childComp/main.vue";
import commentFooter from "./childComp/footer.vue";
import { getCookie } from "@/utils/cookie";
import {
  IComment,
  CommentClass,
  operationComment,
  songSheetComment,
  albumComment,
  songsComment
} from "@/service/comment";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    commentHead,
    commentMain,
    commentFooter
  }
})
export default class Comment extends Vue {
  private page: number = 0;
  private commentNewData: object[] = [];
  private commentHotData: object[] = [];
  private commentTotal: number = 0;
  private commentType: number = -1; // 评论类型 (0:歌曲  1:mv  2:歌单  3:专辑  4:电台  5:视频  6:动态)
  private mode: boolean = true; // 评论模式（最新、最热）
  private timer: any = null;

  get id() {
    return parseInt(<string>this.$route.query.id);
  }

  created() {
    switch (this.$route.path) {
      case "/comment/songsheet":
        this.getSongsheetComment();
        this.commentType = 2;
        break;
      case "/comment/album":
        this.getAlbumComment();
        this.commentType = 3;
        break;
      case "/comment/songs":
        this.getSongsComment();
        this.commentType = 0;
        break;
    }
  }
  async setOperationComment(t: number, content: string, commentId?: number) {
    let res = await operationComment(
      t,
      this.commentType,
      parseInt(<string>this.$route.query.id),
      content,
      commentId
    );
    if (res.code === 200) {
      switch (t) {
        case 0:
          let index = this.commentNewData.findIndex(item => {
            return (<IComment>item).commentId === commentId;
          });
          this.commentNewData.splice(index, 1);
          this.commentTotal -= 1;
          break;
        case 1:
          this.commentNewData.unshift(new CommentClass(res.comment));
          this.commentTotal += 1;
          break;
        case 2:
          this.commentNewData.unshift(new CommentClass(res.comment));
          (<any>this).commentNewData[0].parentCommentId = commentId;
          break;
      }
    } else {
      this.$toast(res.msg);
    }
  }
  async getSongsheetComment() {
    let res = await songSheetComment(this.id, this.page);
    if (res.code === 200) {
      this.commentTotal = res.total;
      // 最新评论
      for (const item of res.comments) {
        this.commentNewData.push(...[new CommentClass(item)]);
      }
      // 最热评论
      if (this.page === 0) {
        for (const item of res.hotComments) {
          this.commentHotData.push(...[new CommentClass(item)]);
        }
      }
    }
  }
  async getAlbumComment() {
    let res = await albumComment(this.id, this.page);
    if (res.code === 200) {
      this.commentTotal = res.total;
      // 最新评论
      for (const item of res.comments) {
        this.commentNewData.push(...[new CommentClass(item)]);
      }
      // 最热评论
      if (this.page === 0) {
        for (const item of res.hotComments) {
          this.commentHotData.push(...[new CommentClass(item)]);
        }
      }
    }
  }
  async getSongsComment() {
    let res = await songsComment(this.id, this.page);
    if (res.code === 200) {
      this.commentTotal = res.total;
      // 最新评论
      for (const item of res.comments) {
        this.commentNewData.push(...[new CommentClass(item)]);
      }
      // 最热评论
      if (this.page === 0) {
        for (const item of res.hotComments) {
          this.commentHotData.push(...[new CommentClass(item)]);
        }
      }
    }
  }
  testLogin() {
    if (!getCookie("MUSIC_U")) {
      this.$router.push("/login");
    }
  }
  changeType(val: boolean) {
    this.mode = val;
    (<any>this).$refs.commentMain.$refs.commentScroll &&
      (<any>this).$refs.commentMain.$refs.commentScroll.finishPullUp();
  }
  nextPage() {
    if (!this.mode) return false; // 最热评论 只获取第一页中的热门数据 不做加载更多
    this.page++;
    switch (this.$route.path) {
      case "/comment/songsheet":
        this.getSongsheetComment();
        break;
      case "/comment/album":
        this.getAlbumComment();
        break;
      case "/comment/songs":
        this.getSongsComment();
        break;
    }
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      (<any>this).$refs.commentMain.$refs.commentScroll.finishPullUp();
    }, 2000);
  }
}
</script>
<style scoped lang='less'>
.comment {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1112;
  background: white;
}
</style>