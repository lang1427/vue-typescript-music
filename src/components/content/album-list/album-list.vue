<template>
  <div class="album-list">
    <slot name="top"></slot>
    <div v-for="item of albumList" :key="item.id">
      <album-list-items :albumListItems="item" />
    </div>
    <slot name="bottom"></slot>
  </div>
</template>

<script lang="ts">
import albumListItems from './album-list-items.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    albumListItems
  }
})
export default class AlbumList extends Vue {
  @Prop({
    default() {
      return []
    }
  })
  albumList!: object[]
}
</script>

<style lang="less" scoped>
.album-list {
  padding: 0 10px;
}
</style>
