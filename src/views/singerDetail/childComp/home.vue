<template>
  <div class="singer-detail-home">
    <single-list v-if="singleList.length != 0" :songlist="singleList">
      <h3 slot="top" class="title">
        <span class="fa-play-circle-o"></span>播放热门50
      </h3>
    </single-list>
    <loading v-show="$store.state.loadingShow" />
  </div>
</template>

<script lang="ts">
import singleList from 'components/content/single-list/single-list.vue'
import { loadingMixin } from '@/utils/mixin'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
    singleList
  },
  mixins: [loadingMixin]
})
export default class SingerDetailHome extends Vue {
  @Prop({
    default() {
      return []
    }
  })
  singleList!: object[]
}
</script>

<style lang="less" scoped>
.singer-detail-home {
  background-color: white;
  h3.title {
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
    font-size: 16px;
    margin-bottom: -10px;
    .fa-play-circle-o {
      padding-right: 8px;
      font-size: 20px;
    }
  }
}
</style>
