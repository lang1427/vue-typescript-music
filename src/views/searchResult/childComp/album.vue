<template>
  <div>
    <scroll
      v-if="albumList.length != 0"
      class="album-scroll"
      ref="albumScroll"
      :pullUpLoad="true"
      @pullingUp="pullingUp"
    >
      <div class="album">
        <album-list :albumList="albumList" />
      </div>
    </scroll>
    <loading v-else />
  </div>
</template>

<script lang="ts">
import scroll from 'components/common/scroll/scroll.vue'
import albumList from 'components/content/album-list/album-list.vue'

import { formatDate } from '@/utils/formatDate'
import { loadingMixin } from '@/utils/mixin'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    scroll,
    albumList
  },
  mixins: [loadingMixin]
})
export default class Album extends Vue {
  @Prop({
    default() {
      return []
    }
  })
  albumList!: object[]

  mounted() {
    ;(<any>this).$bus.$on('finishPullUp', () => {
      this.$refs.albumScroll && (<any>this.$refs.albumScroll).finishPullUp()
      this.$refs.albumScroll && (<any>this.$refs.albumScroll).refresh()
    })
  }
  destroyed() {
    ;(<any>this).$bus.$off('finishPullUp')
  }

  pullingUp() {
    this.$emit('pullingUp', 4)
  }
}
</script>

<style lang="less" scoped>
.album-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 0;
  overflow: hidden;
  .album {
    padding: 10px 10px 0;
  }
}
</style>
