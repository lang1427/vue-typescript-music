<template>
  <div class="delete-song">
    <top-bar class="topbar">
      <div slot="left" @click="back">
        <span class="fa-arrow-left"></span>
      </div>
      <div slot="center">{{ selectedItems }}</div>
      <div slot="right" @click="allCheck">{{ isAllCheckText }}</div>
    </top-bar>
    <div class="body">
      <div v-if="mySongsList.length!=0" ref="songlistREF">
        <div class="list-items" v-for="item of mySongsList" :key="item.id">
          <div class="check">
            <input type="checkbox" class="checkbox-items" v-model="isChecks" :value="item.id" />
          </div>
          <div class="info">
            <div class="img">
              <img :src="item.imgUrl" alt />
            </div>
            <div class="name-count">
              <p>{{ item.name }}</p>
              <p>{{ item.count }}首</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="delete-box" @click="deleteConfirmShow">
        <p class="fa-trash-o delete ico"></p>
        <p class="delete text">删除</p>
      </div>
    </div>
    <delete-confirm
      content="确认删除歌单吗？"
      :isShow="deleteShow"
      @cancel="deleteShow = false"
      @confirm="deleteSong"
    />
  </div>
</template>

<script lang='ts'>
import { userSongsManageMixin } from "@/utils/mixin";
import { deleteSongsheet } from "@/service/songsheet";
import topBar from "@/components/common/navbar/navbar.vue";
import deleteConfirm from "@/components/common/kl-confirm/kl-confirm.vue";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
@Component({
  components: {
    topBar,
    deleteConfirm
  },
  mixins: [userSongsManageMixin]
})
export default class DeleteSong extends Vue {
  private isChecks: number[] = [];
  private deleteShow: boolean = false;
  created() {
    (this as any).getUserSongsheet();
  }

  get isAllCheckText() {
    if (this.isChecks.length === (this as any).mySongsList.length) {
      return "取消全选";
    }
    return "全选";
  }

  get selectedItems() {
    return `已选择${this.isChecks.length}项`;
  }

  async setDeleteSongsheet() {
    let ids = this.isChecks.join(",");
    let res = await deleteSongsheet(ids);
    if (res.code === 200) {
      this.isChecks = [];
      (this as any).getUserSongsheet();
    }
  }

  back() {
    this.$router.go(-1);
  }
  allCheck() {
    let checkBox = this.$refs.songlistREF;
    let checkItems = (checkBox as HTMLElement).querySelectorAll(
      ".checkbox-items"
    );
    if (this.isAllCheckText === "全选") {
      this.isChecks = [];
      for (let item of checkItems) {
        this.isChecks.push((item as any).value);
      }
    } else {
      this.isChecks = [];
    }
  }
  deleteConfirmShow() {
    if (this.isChecks.length === 0) {
      this.$toast("未选择歌单");
      return !1;
    }
    this.deleteShow = true;
  }
  deleteSong() {
    this.setDeleteSongsheet();
    this.deleteShow = false;
  }
}
</script>
<style scoped lang='less'>
.delete-song {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 3003;
  background-color: white;
  .body {
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: auto;
    .list-items {
      display: flex;
      align-items: center;
      height: 40px;
      margin: 8px 0;
      .check {
        width: 40px;
        text-align: center;
      }
      .info {
        padding-left: 10px;
        flex: 1;
        display: flex;
        .img {
          width: 40px;
          height: 40px;
          img {
            display: block;
            width: 100%;
          }
        }
        .name-count {
          padding-left: 10px;
        }
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 25px;
    background: white;
    border-top: 1px solid #dedede;
    .delete-box {
      width: 50px;
      text-align: center;
      margin: 0 auto;
      .delete {
        text-align: center;
        color: #666;
        &.ico {
          font-size: 18px;
        }
        &.text {
          font-size: 12px;
        }
      }
    }
  }
}
</style>