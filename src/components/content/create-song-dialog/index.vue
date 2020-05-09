<template>
  <kl-dialog :overlayZIndex="111112" :zIndex="111113" :dialogShow="createSongShow" @hide="close">
    <div class="create-song-box">
      <h3>新建歌单</h3>
      <div class="input-box">
        <input class="input" type="text" placeholder="请输入歌单标题" autofocus v-model="songTitle" />
        <span class="limit">{{ inputLimit }}</span>
      </div>
      <div class="operation">
        <span class="btn" @click="close">取消</span>
        <span class="btn" :style="submitStyle" @click="submitNewCreate(isAddSong)">提交</span>
      </div>
    </div>
  </kl-dialog>
</template>

<script>
import { getCookie } from "@/utils/cookie";
import { createSongSheet, songsheetOperation } from "@/service/songsheet";
import klDialog from "@/components/common/kl-dialog/kl-dialog.vue";
export default {
  components: {
    klDialog
  },
  props: {
    isAddSong: {
      type: Boolean,
      default: true
    },
    createSongShow: {
      // 新建歌单弹框的显示与隐藏 决定性变量
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      songTitle: ""
    };
  },
  computed: {
    inputLimit() {
      return `${this.songTitle.length}/20`;
    },
    submitStyle() {
      return this.songTitle.length === 0 ? { opacity: 0.6 } : "";
    }
  },
  methods: {
    // 新建歌单操作， 输入歌单名称即可完成新建 （新建过程中 <提交时> 是否需要将当前播放列表中的数据加入到新建歌单中？ 默认为需要 通过props（isAddSong）可取消加入）
    async NewCreateSongSheet(isAddSong) {
      if (getCookie("MUSIC_U") == undefined) {
        this.$router.push("/login");
      }
      let res = await createSongSheet(this.songTitle);
      if (res.code === 200) {
        this.songTitle = "";
        if (isAddSong) {
          this.SetSongsheetOperation("add", res.id);
        } else {
          this.close();
          this.$emit("complete", "新建歌单完成");
        }
      }
    },
    // 将当前播放列表中的数据加入到新建歌单中
    async SetSongsheetOperation(operation, pid) {
      let ids = this.$store.state.playList.map(item => {
        return item.id;
      });
      ids = ids.join(",");
      let res = await songsheetOperation(operation, pid, ids);
      if (res.code === 200) {
        this.close();
        this.$emit("complete", "当前播放列表数据已成功加入新建歌单中");
      }
    },
    submitNewCreate(isAdd) {
      if (this.songTitle.length === 0) return false;
      this.NewCreateSongSheet(isAdd);
    },

    close() {
      this.$emit("close", "关闭新建歌单弹框");
    }
  }
};
</script>
<style scoped lang='less'>
.create-song-box {
  padding: 10px;
  .input-box {
    display: flex;
    width: 200px;
    flex-direction: column;
    margin: 10px 0;
    .input {
      width: 100%;
      border: none;
      outline: none;
      text-indent: 0.5em;
      border-bottom: 1px solid #ccc;
    }
    .limit {
      text-align: right;
      font-size: 12px;
      color: #999;
    }
  }
  .operation {
    display: flex;
    justify-content: flex-end;
    .btn {
      color: @klColor;
      width: 40px;
      text-align: center;
    }
  }
}
</style>