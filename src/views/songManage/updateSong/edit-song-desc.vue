<template>
  <div class="edit-song-desc">
    <div class="head">
      <span class="fa-arrow-left ico" @click="back"></span>
      <span class="title">歌单介绍</span>
      <span class="save" @click="save">保存</span>
    </div>
    <div class="body">
      <textarea autofocus placeholder="歌单介绍" v-model="descInfo"></textarea>
    </div>
    <div class="footer">
      <span>{{ residue }}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { updateSongDesc } from "@/service/songsheet";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class EditSongDesc extends Vue {
  private descInfo: string | (string | null)[] = "";
  get id() {
    return parseInt(<string>this.$route.query.songid);
  }
  get residue() {
    return `${1000 - this.descInfo.length}`;
  }
  created() {
    this.descInfo = this.$route.query.desc;
  }
  async setUpdateSongDesc() {
    let res = await updateSongDesc(this.id, <string>this.descInfo);
    if (res.code === 200) {
      this.$toast("修改成功");
      this.back();
    }
  }
  back() {
    this.$router.back();
  }
  save() {
    if (this.descInfo === this.$route.query.desc) {
      this.$toast("未修改");
      return false;
    }
    this.setUpdateSongDesc();
  }
}
</script>
<style scoped lang='less'>
.edit-song-desc {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  .head {
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    height: 50px;
    align-items: center;
    .ico {
      width: 50px;
      text-align: center;
      font-size: 18px;
    }
    .title {
      flex: 1;
    }
    .save {
      width: 50px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }
  .body {
    margin-top: 45px;
    margin-bottom: 40px;
    textarea {
      width: 100%;
      height: 567px;
      outline: none;
      border: none;
      padding: 10px;
      resize: none;
      box-sizing: border-box;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
    text-align: right;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background-color: #ccc;
      /* 如果不用 background-color, 使用 border-top:1px solid #f00; 效果是一样的*/
      transform: scaleY(0.5);
    }
    span {
      padding-right: 8px;
      color: #999;
    }
  }
}
</style>