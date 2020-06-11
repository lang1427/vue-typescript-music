<template>
  <div class="ranking-list">
    <top-bar class="top-bar">
      <div slot="left" @click="back">
        <span class="fa-arrow-left"></span>
      </div>
      <div slot="center" class="title">排行榜</div>
    </top-bar>
    <h4 class="title">官方榜</h4>
    <section class="official">
      <div
        class="list-items"
        @click="goToplist(item.name)"
        v-for="item of officialList"
        :key="item.id"
      >
        <div class="bg-img" :style="{'background-image':'url('+item.coverImgUrl+')'}">
          <div class="update-text">{{ item.updateFrequency }}</div>
        </div>
        <div class="song-info">
          <div class="song-items" v-for="(song,sIndex) of item.songsInfo" :key="song.first">
            <p class="song-text">{{ sIndex+1 }}.{{ song.first }}-{{ song.second }}</p>
          </div>
        </div>
      </div>
    </section>
    <h4 class="title">推荐榜</h4>
    <section class="recommend">
      <grid-view :cols="3" :vMargin="0" :hMargin="0">
        <div
          class="list-items"
          @click="goToplist(item.name)"
          v-for="item of recommendList"
          :key="item.id"
        >
          <div class="bg-img" :style="{'background-image':'url('+item.coverImgUrl+')'}">
            <div class="update-text">{{ item.updateFrequency }}</div>
          </div>
          <div class="name">{{ item.name }}</div>
        </div>
      </grid-view>
    </section>
  </div>
</template>

<script lang='ts'>
import topBar from "@/components/common/navbar/navbar.vue";
import gridView from "@/components/common/gridview/grid-view.vue";
import { rankIdx, topListDetail, RankData } from "@/service/rankinglist";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    topBar,
    gridView
  }
})
export default class RankingList extends Vue {
  private rankList: object[] = [];
  get officialList() {
    return this.rankList.filter(item => {
      return (<any>item).songsInfo.length !== 0;
    });
  }
  get recommendList() {
    return this.rankList.filter(item => {
      return (<any>item).songsInfo.length === 0;
    });
  }

  created() {
    this.getToplistDetail();
  }

  back() {
    this.$router.back();
  }
  goToplist(name: string) {
    let idx = rankIdx.findIndex(item => {
      return item === name;
    });
    this.$router.push("/toplist/" + idx);
  }

  async getToplistDetail() {
    let res = await topListDetail();
    if (res.code === 200) {
      let arr = [];
      for (const item of res.list) {
        arr.push(new RankData(item));
      }
      this.rankList = arr;
    }
  }
}
</script>
<style scoped lang='less'>
.ranking-list {
  .top-bar {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 11;
    background: white;
    .fa-arrow-left {
      font-size: 18px;
    }
    .title {
      font-weight: 600;
    }
  }
  .title {
    padding-left: 10px;
  }
  .official {
    padding: 10px;
    .list-items {
      display: flex;
      height: 100px;
      align-items: center;
      margin-bottom: 10px;
      .bg-img {
        width: 100px;
        height: 100px;
        background-size: 100%;
        border-radius: 3px;
        position: relative;
        .update-text {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.1);
          font-size: 12px;
          color: white;
        }
      }
      .song-info {
        flex: 1;
        overflow: hidden;
        .song-items {
          .song-text {
            color: #666;
            font-size: 12px;
            padding: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .recommend {
    padding: 10px;
    .list-items {
      .bg-img {
        width: 100px;
        height: 100px;
        background-size: 100%;
        border-radius: 3px;
        position: relative;
        .update-text {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.1);
          font-size: 12px;
          color: white;
        }
      }
      .name {
        font-size: 12px;
      }
    }
  }
}
</style>