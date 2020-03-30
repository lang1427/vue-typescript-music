<template>
  <div class="song-list" v-if="songlist.length!=0">
    <div class="play">
      <span class="fa-play-circle-o"></span>
      <span>播放全部</span>
      <span>(共5首)</span>
    </div>
    <div class="list">
      <div v-for="(item,index) of songlist" :key="item.id" class="list-item">
        <div>{{ index+1 }}</div>
        <div>
            <p></p>
            <p></p>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
@Component
export default class SongList extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  songlist!: object[];

  created() {}
}
</script>
<style scoped lang='less'>
.song-list {
}
</style>