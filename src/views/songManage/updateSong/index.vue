<template>
  <div class="update-song">
    <div class="head">
      <span class="fa-arrow-left ico" @click="back"></span>
      <span class="title">编辑歌单信息</span>
    </div>
    <div class="body">
      <ul>
        <li @click="goEditName">
          <span class="key">名称</span>
          <input type="text" class="edit-input" placeholder="请输入歌单名称" v-model="songName" />
        </li>
        <li @click="goEditTags">
          <span class="key">标签</span>
          <input type="text" class="edit-input" placeholder="请输入歌单标签" v-model="songTags" />
        </li>
        <li @click="goEditDesc">
          <span class="key">描述</span>
          <input type="text" class="edit-input" placeholder="请输入歌单描述" v-model="songDesc" />
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang='ts'>
interface IBaseinfo {
  title: string;
  tags: string[];
  description: string;
}
import { songsDetail, SongsBaseInfo } from "@/service/songsheet";
import { Component, Vue } from "vue-property-decorator";
Component.registerHooks(["beforeRouteUpdate"]);
@Component
export default class UpdateSong extends Vue {
  private baseInfo = {};
  beforeRouteUpdate(to: any, from: any, next: any) {
    if (to.path === "/songmanage/update") {
      this.getSongDetail(to.query.id);
    }
    next();
  }
  created() {
    if (this.$route.path === "/songmanage/update") {
      this.getSongDetail();
    }
  }

  get songName() {
    // return this.$route.query.name;
    return (this.baseInfo as IBaseinfo).title;
  }
  get songTags() {
    // return this.$route.query.tags;
    return (
      (this.baseInfo as IBaseinfo).tags &&
      (this.baseInfo as IBaseinfo).tags.join("-")
    );
  }
  get songDesc() {
    // return this.$route.query.desc;
    return (this.baseInfo as IBaseinfo).description;
  }
  get id() {
    return parseInt(<string>this.$route.query.id);
  }

  async getSongDetail(id = this.id) {
    let res = await songsDetail(id);
    this.baseInfo = new SongsBaseInfo(res.playlist);
  }

  back() {
    this.$router.back();
  }
  goEditName() {
    this.$router.push({
      path: "/songmanage/update/editname",
      query: {
        songid: this.id + "",
        songname: this.songName
      }
    });
  }
  goEditTags() {
    this.$router.push({
      path: "/songmanage/update/edittags",
      query: {
        songid: this.id + "",
        tags: this.songTags
      }
    });
  }
  goEditDesc() {
    this.$router.push({
      path: "/songmanage/update/editdesc",
      query: {
        songid: this.id + "",
        desc: this.songDesc
      }
    });
  }
}
</script>
<style scoped lang='less'>
.update-song {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  z-index: 2003;
  .head {
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    height: 50px;
    align-items: center;
    border-bottom: 5px solid #ccc;
    .ico {
      width: 50px;
      text-align: center;
      font-size: 18px;
    }
    .title {
      flex: 1;
    }
  }
  .body {
    position: absolute;
    left: 0;
    top: 55px;
    right: 0;
    li {
      display: flex;
      padding: 8px;
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
      .key {
        width: 80px;
      }
      .edit-input {
        flex: 1;
        text-align: right;
        caret-color: transparent !important;
        outline: none;
        border: none;
        color: #444;
        transform: scaleY(1); // 这里需要将其缩放为原来的大小
      }
    }
  }
}
</style>