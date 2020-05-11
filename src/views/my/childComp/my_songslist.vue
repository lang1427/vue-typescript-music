<template>
  <div class="my_songslist">
    <div class="tab-head">
      <div
        :class="['songs','create-songs',isCreateShow ? '' : 'noActive']"
        @click="isCreateShow = true"
      >
        创建歌单
        <span class="count">{{ songsList.length }}</span>
      </div>
      <div
        :class="['songs','star-songs',isCreateShow ? 'noActive' : '']"
        @click="isCreateShow = false"
      >
        收藏歌单
        <span class="count">0</span>
      </div>
    </div>
    <div class="tab-content">
      <div class="create-content" v-show="isCreateShow">
        <div class="songs-list" v-if="songsList.length!=0">
          <div
            class="list-items"
            v-for="(item) of songsList"
            :key="item.id"
            @click="goSongsheet(item.id)"
          >
            <div class="items">
              <div class="img">
                <img :src="item.imgUrl" alt />
              </div>
              <div class="info">
                <p class="name">{{ item.name }}</p>
                <p class="count">{{ item.count }}首</p>
              </div>
            </div>
          </div>
        </div>
        <div class="songs-manage" @click="isManageDialog=true">
          <span class="fa-file-text-o ico"></span> 歌单管理
        </div>
      </div>
      <div class="star-content" v-show="!isCreateShow">
        <div class="no-star">暂无收藏的歌单</div>
      </div>
    </div>
    <manage-dialog :dialogShow="isManageDialog" @hide="isManageDialog=false">
      <div class="manage-dialog">
        <div class="items" @click="createSongShow=true">
          <span class="fa-plus-square-o ico"></span>&nbsp;&nbsp;新建歌单
        </div>
        <div class="items" @click="deleteSong">
          <span class="fa-trash-o ico"></span>&nbsp;&nbsp;删除歌单
        </div>
      </div>
    </manage-dialog>
    <createSongDialog
      :isAddSong="false"
      :createSongShow="createSongShow"
      @close="createSongShow=false"
      @complete="createSongComplete"
    />
  </div>
</template>

<script lang='ts'>
import manageDialog from "@/components/common/kl-dialog/kl-dialog.vue";
import createSongDialog from "@/components/content/create-song-dialog/index.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {
    manageDialog,
    createSongDialog
  }
})
export default class MySongslist extends Vue {
  @Prop({ default: [] }) songsList!: boolean;
  private isCreateShow: boolean = true;
  private isManageDialog: boolean = false;
  private createSongShow: boolean = false;

  created() {}

  createSongComplete() {
    this.isManageDialog = false;
    (this.$parent as any).getUserSongsheet();
  }
  goSongsheet(id: number) {
    this.$router.push("/songsheet/" + id);
  }
  deleteSong() {
    this.$router.push("/songmanage/delete");
  }
}
</script>
<style scoped lang='less'>
.my_songslist {
  padding: 15px;
  .tab-head {
    .songs {
      display: inline-block;
      position: relative;
      font-weight: 600;
      width: 80px;
      .count {
        position: absolute;
        left: 57px;
        bottom: -1px;
        font-size: 12px;
      }
    }
    .noActive {
      opacity: 0.8;
    }
    .create-songs {
    }
    .star-songs {
    }
  }
  .tab-content {
    padding: 10px 0;
    .create-content {
      .songs-list {
        display: flex;
        flex-wrap: wrap;
        .list-items {
          width: 50%;
          .items {
            padding-bottom: 10px;
            display: flex;
            align-items: center;
            .img {
              width: 40px;
              height: 40px;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .info {
              padding-left: 10px;
              .count {
                font-size: 12px;
                color: #999;
              }
            }
          }
        }
      }
      .songs-manage {
        border: 1px solid #ccc;
        border-radius: 2px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #999;
        font-size: 12px;
        .ico {
          color: #999;
        }
      }
    }
    .star-content {
      .no-star {
        text-align: center;
        color: #999;
        font-size: 12px;
      }
    }
  }
  .manage-dialog {
    width: 200px;
    .items {
      text-align: center;
      color: #666;
      padding: 10px;
      & + .items {
        border-top: 1px solid @klColor;
      }
      .ico {
        color: #666;
      }
    }
  }
}
</style>