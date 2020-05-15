<template>
  <div class="edit-song-name">
    <div class="head">
      <span class="fa-arrow-left ico" @click="back"></span>
      <span class="title">歌单名称</span>
      <span class="save" @click="save">保存</span>
    </div>
    <div class="body">
      <div class="input-box">
        <input
          class="editname-input"
          maxlength="30"
          type="text"
          placeholder="编辑歌单名称"
          v-model="songName"
        />
        <span class="remove-text" @click="remove" v-show="isRemove">x</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { updateSongName } from "@/service/songsheet";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class EditSongName extends Vue {
  private songName: string | (string | null)[] = "";
  get isRemove() {
    return this.songName === "" ? false : true;
  }
  get id() {
    return parseInt(<string>this.$route.query.songid);
  }
  created() {
    this.songName = this.$route.query.songname;
  }
  async setUpdateSongName() {
    let res = await updateSongName(this.id, <string>this.songName);
    if (res.code === 200) {
      this.$toast("修改成功");
      // this.$route.query.songname = this.songName // query.songname改变了 but 地址栏中的songname并没有发生变化   *错误方式*
      this.$router.replace({
        query: { ...this.$route.query, songname: this.songName }
      });
    }
  }
  back() {
    this.$router.back();
  }
  save() {
    if (this.songName === "") {
      this.$toast("请输入歌单名称");
      return false;
    }
    if (this.songName === this.$route.query.songname) {
      this.$toast("未修改");
      return false;
    }
    this.setUpdateSongName();
  }
  remove() {
    this.songName = "";
  }
}
</script>
<style scoped lang='less'>
.edit-song-name {
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
    border-bottom: 5px solid #ccc;
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
    position: absolute;
    left: 0;
    top: 55px;
    right: 0;
    .input-box {
      position: relative;
      width: 355px;
      margin: 15px 10px;
      border-bottom: 1px solid #ccc;
      .editname-input {
        border: none;
        outline: none;
        width: 335px;
        padding-left: 5px;
      }
      .remove-text {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #999;
        width: 20px;
        text-align: center;
      }
    }
  }
}
</style>