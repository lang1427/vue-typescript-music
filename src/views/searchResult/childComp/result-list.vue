<template>
  <div class="result-list" v-if="Object.keys(resultlist).length!=0">
    <!-- 歌手 -->
    <div class="artist" v-for="item of resultlist.artist" :key="item.id">
      <div class="avatar">
        <img :src="item.picUrl" alt />
      </div>
      <div class="info">
        <p>歌手:{{ item.name }}</p>
        <p>粉丝：{{ item.fansSize | finalPlayCount }}歌曲：{{ item.musicSize }}专辑：{{ item.albumSize }}</p>
      </div>
    </div>
    <!-- 专辑 -->
    <div class="album" v-for="item of resultlist.album" :key="item.id">
      <div class="avatar">
        <img :src="item.picUrl" alt />
      </div>
      <div class="info">
        <p>专辑:{{ item.name }}</p>
        <p>{{ item.artist.name }}</p>
      </div>
    </div>
    <!-- MV视频 -->
    <div class="mv" v-for="item of resultlist.mv" :key="item.id">
      <div class="avatar">
        <img :src="item.picUrl" alt />
      </div>
      <div class="info">
        <p>MV:{{ item.name }}</p>
        <p>{{ item.artist.name }}</p>
      </div>
    </div>
    <!-- 电台 -->
    <div class="radio" v-for="item of resultlist.radio" :key="item.id">
      <div class="avatar">
        <img :src="item.picUrl" alt />
      </div>
      <div class="info">
        <p>电台:{{ item.name }}</p>
        <p>{{ item.artist.name }}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ResultList extends Vue {
  @Prop({
    default() {
      return {};
    }
  })
  resultlist!: object;
}
</script>

<style lang="less" scoped>
.result-list {
  padding: 50px 10px 0;
  .artist,
  .album,
  .mv,
  .radio {
    display: flex;
    height: 60px;
    align-items: center;
    .avatar {
      width: 60px;
      height: 60px;
      padding: 5px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .info {
      flex: 1;
    }
  }
}
</style>