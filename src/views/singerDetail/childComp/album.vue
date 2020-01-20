<template>
  <div class="album">
    <album-list :albumList="albumList">
      <div v-show="isMore" class="hasMore" slot="bottom">
        {{ message }}
      </div>
    </album-list>
  </div>
</template>

<script lang="ts">
import albumList from 'components/content/album-list/album-list.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    albumList
  }
})
export default class Album extends Vue {
  @Prop({
    default() {
      return []
    }
  })
  albumList!: object[]
  @Prop({
    default() {
      return false
    }
  })
  isMore!: boolean

  get message() {
    return `很遗憾，仅能浏览以上${this.albumList &&
      this.albumList.length}条数据`
  }
}
</script>

<style lang="less" scoped>
.album {
  background-color: white;
  .hasMore {
    text-align: center;
    font-size: 12px;
    color: #999;
  }
}
</style>
