<template>
  <swiper class="find-swiper" v-if="bannerlist && bannerlist.length != 0">
    <swiper-item
      class="find-swiper-item"
      v-for="item of bannerlist"
      :key="item.bannerId"
    >
      <a :href="item.url">
        <img :src="item.pic" alt />
      </a>
    </swiper-item>
  </swiper>
</template>

<script lang="ts">
import swiper from 'components/common/swiper/Swiper.vue'
import swiperItem from 'components/common/swiper/SwiperItem.vue'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component({
  components: {
    swiper,
    swiperItem
  }
})
export default class FindSwiper extends Vue {
  @Prop() bannerlist!: object[]
}
</script>

<style lang="less" scoped>
.find-swiper {
  height: 150px;
  .find-swiper-item {
    height: 150px;
    a {
      display: block;
      height: 100%;
      width: 100%;
      img {
        height: 100%;
      }
    }
  }
}
</style>
