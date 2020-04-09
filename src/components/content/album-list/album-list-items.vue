<template>
  <div class="album-list-items" @click="goAlbum(albumListItems.id)">
    <div class="avatar">
      <img v-lazy="albumListItems.blurPicUrl" alt />
    </div>
    <div class="info">
      <p class="name">{{ albumListItems.name }}</p>
      <p class="desc">{{ desc }}</p>
    </div>
  </div>
</template>

<script lang="ts">
interface IAlbum {
  publishTime: number
  size: number
  artist: {
    name: string
  }
}
import { formatDate } from '@/utils/formatDate'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AlbumListItems extends Vue {
  @Prop({
    default() {
      return {}
    }
  })
  albumListItems!: IAlbum

  get desc() {
    let date = new Date(this.albumListItems.publishTime)
    if (window.location.href.match(/\/singer\/detail\//)) {
      return `${formatDate(date, 'yyyy-MM-dd')}
      歌曲 ${this.albumListItems.size}`
    } else {
      return `${this.albumListItems.artist.name}
     ${formatDate(date, 'yyyy-MM-dd')}`
    }
  }

  goAlbum(id:number){
    this.$router.push('/album/'+id)
  }
}
</script>

<style lang="less" scoped>
.album-list-items {
  display: flex;
  align-items: center;
  padding: 6px 0;
  .avatar {
    width: 60px;
    height: 60px;
    position: relative;
    img {
      display: block;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .info {
    flex: 1;
    padding-left: 10px;
    .desc {
      font-size: 12px;
      padding-top: 3px;
      color: #999;
    }
  }
}
</style>
