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
          <div class="publish-time">发行时间 : {{ info.publishTime | newTime }}</div>
          <div class="desc">{{ info.description }}</div>
        </div>
      </div>
    </div>
    <div class="operation">
      <div class="items">
        <p class="fa-commenting-o ico"></p>
        <p>{{ info.commentCount }}</p>
      </div>
      <div class="items">
        <p class="fa-link ico"></p>
        <p>{{ info.shareCount }}</p>
      </div>
      <div class="items">
        <p class="fa-cloud-download ico"></p>
        <p>下载</p>
      </div>
      <div class="items">
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
    return `歌手 : ${(<any>this.info).singerName} >`;
  }
  created() {}
}
</script>
<style scoped lang='less'>
.bg-info {
  padding: 10px;
  background-color: #8a5e5d;
  padding-bottom: 60px;
  .info {
    display: flex;
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
      }
      .singer {
        color: #eae1e2;
        padding-top: 10px;
        font-size: 12px;
      }
      .detail-info {
        padding-top: 20px;
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