<template>
  <div class="my-head">
    <div class="login">
      <div class="avatar">
        <img :src="isLogin.Avatar" alt />
      </div>
      <div class="nikename">{{ isLogin.Nikename }}</div>
      <div class="login-btn" v-if="userBaseinfo.userId===-1">
        <span @click="goLogin">立即登录</span>
      </div>
    </div>
    <div class="relevant">
      <div class="list-items">
        <div
          class="item"
          v-for="item of relevantContent"
          :key="item.path"
          @click="goRelevant(item.path)"
        >
          <div :class="[item.ico,'icon']"></div>
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import { IProfile } from "@/service/user";
@Component({})
export default class Myhead extends Vue {
  @Prop() userBaseinfo!: IProfile;
  private relevantContent: object[] = [
    { title: "播放历史", path: "/my/playhistory", ico: "fa-history" },
    { title: "我的电台", path: "/my/radio", ico: "fa-video-camera" },
    { title: "我的收藏", path: "/my/star", ico: "fa-star-o" },
    { title: "关注新歌", path: "/my/watchnewmusic", ico: "fa-eye" }
  ];

  get isLogin() {
    if (this.userBaseinfo.userId !== -1) {
      return {
        Avatar: this.userBaseinfo.avatarUrl,
        Nikename: this.userBaseinfo.nickname
      };
    } else {
      return {
        Avatar: require("@/assets/images/login-avatar.jpg"),
        Nikename: "登录立享手机电脑多端同步"
      };
    }
  }
  created() {}
  goLogin() {
    this.$router.push("/login");
  }
  goRelevant(path: string) {
    if ((path === "/my/playhistory")) {
      this.$router.push(path);
      return false;
    }
    this.$toast("很遗憾，暂未开放此功能");
    return false;
    this.$router.push(path);
  }
}
</script>
<style scoped lang='less'>
.my-head {
  background-color: rgb(1, 1, 1);
  .login {
    display: flex;
    padding: 15px;
    align-items: center;
    height: 60px;
    .avatar {
      width: 45px;
      height: 45px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .nikename {
      flex: 1;
      padding-left: 15px;
      font-size: 12px;
      color: #dedede;
    }
    .login-btn {
      width: 60px;
      span {
        color: #dedede;
        font-size: 12px;
        padding: 2px 3px;
        border: 1px solid #bbb;
        border-radius: 4px 4px 3px 3px;
      }
    }
  }
  .relevant {
    padding: 20px 0 30px;
    .list-items {
      display: flex;
      .item {
        flex: 1;
        text-align: center;
        .icon,
        .title {
          color: #dedede;
        }
        .icon {
          font-size: 25px;
        }
        .title {
          font-size: 12px;
        }
      }
    }
  }
}
</style>