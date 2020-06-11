<template>
  <div class="bg-info">
    <div class="info">
      <div class="img">
        <img :src="info.imgUrl" alt />
      </div>
      <div class="album-info">
        <h3 class="title">{{ info.title }}</h3>
        <div class="singer">{{ singerInfo }}</div>
        <div class="detail-info">
          <div
            class="publish-time"
            :style="info.publishTime?'':'visibility: hidden;'"
          >发行时间 : {{ info.publishTime | newTime }}</div>
          <div class="desc">{{ info.description }}</div>
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="items" @click="goCommentPage">
        <p class="fa-commenting-o ico"></p>
        <p>{{ info.commentCount }}</p>
      </div>
      <div class="items" @click="toast">
        <p class="fa-link ico"></p>
        <p>{{ info.shareCount }}</p>
      </div>
      <!-- <div class="items">
        <p class="fa-cloud-download ico"></p>
        <p>下载</p>
      </div>-->
      <div class="items" @click="toast">
        <p class="fa-check-circle-o ico"></p>
        <p>多选</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { formatDate } from "@/utils/formatDate";
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  filters: {
    newTime(oldVal: number) {
      let date = new Date(oldVal);
      return formatDate(date, "yyyy.MM.dd");
    }
  }
})
export default class BgInfo extends Vue {
  @Prop({
    default() {
      return {};
    }
  })
  info!: object;

  get singerInfo() {
    if (this.$route.path.match(/\/album\//)) {
      return `歌手 : ${(<any>this.info).singerName} >`;
    } else if (this.$route.path.match(/\/songsheet\//)) {
      return `${(<any>this.info).tags && (<any>this.info).tags.join("-")}`;
    }
  }
  created() {}
  toast() {
    this.$toast("很遗憾，不支持此项功能");
  }

  goCommentPage() {
    // console.log(this.$route.name);
    switch (this.$route.name) {
      case "songsheet":
        this.$router.push({
          path: "/comment/songsheet",
          query: { id: this.$route.params.id }
        });
        break;
      case "album":
        this.$router.push({
          path: "/comment/album",
          query: { id: this.$route.params.id }
        });
        break;
      case "toplist":
        this.$router.push({
          path: "/comment/songsheet",
          query: { id: (<any>this).info.singerId }
        });
    }
  }
}
</script>
<style scoped lang='less'>
.bg-info {
  padding: 10px;
  background-color: #8a5e5d;
  padding-bottom: 60px;
  .info {
    display: flex;
    align-items: center;
    .img {
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .album-info {
      flex: 1;
      padding-left: 18px;
      overflow: hidden;
      .title {
        color: #fff;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .singer {
        color: #eae1e2;
        font-size: 12px;
        padding: 10px 0;
      }
      .detail-info {
        .publish-time,
        .desc {
          color: #cebebf;
          font-size: 12px;
        }
        .desc {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .operation {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .items {
      flex: 1;
      text-align: center;
      p {
        color: #cebebf;
        font-size: 12px;
        &.ico {
          color: white;
          font-size: 18px;
          padding-bottom: 3px;
        }
      }
    }
  }
}
</style>