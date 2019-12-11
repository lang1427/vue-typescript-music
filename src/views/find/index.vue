<template>
  <div class="find">
    <find-swiper :bannerlist="bannerList" />
    <recommend />
  </div>
</template>

<script lang="ts">
import findSwiper from './childComp/find-swiper.vue'
import recommend from './childComp/recommend.vue'
import { getBanner, bannerData } from '@/service/find'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    findSwiper,
    recommend
  }
})
export default class Find extends Vue {
  /**data */
  private bannerList: object[] = []

  /** 生命周期 */
  created() {
    this.getBannerData()
  }

  /** methods */
  async getBannerData() {
    let res = await getBanner(2)
    if (res.code == 200) {
      let arr: object[] = []
      res.banners.forEach((item: object, i: string) => {
        arr.push(new bannerData(item))
      })
      this.bannerList = arr
    }
  }
}
</script>

<style lang="less" scoped>
.find {
}
</style>
