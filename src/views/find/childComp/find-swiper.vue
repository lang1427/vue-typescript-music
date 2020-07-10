<template>
  <div>
    <swiper class="find-swiper" v-if="bannerlist && bannerlist.length != 0">
      <swiper-item class="find-swiper-item" v-for="item of bannerlist" :key="item.bannerId">
        <a :href="item.url">
          <img :src="item.pic" alt />
        </a>
      </swiper-item>
    </swiper>
    <content-loader v-else secondaryColor="#edebec" :speed=1>
      <rect x="78" y="10" rx="0" ry="0" width="250" height="130"/>
      <rect x="40" y="18" rx="0" ry="0" width="233" height="114" />
      <rect x="5" y="25" rx="0" ry="0" width="213" height="99" />
      <rect x="127" y="18" rx="0" ry="0" width="233" height="114" />
      <rect x="181" y="25" rx="0" ry="0" width="213" height="99" />
    </content-loader>
  </div>
</template>

<script lang="ts">
import { ContentLoader } from "vue-content-loader";
import swiper from "components/common/swiper/Swiper.vue";
import swiperItem from "components/common/swiper/SwiperItem.vue";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    ContentLoader,
    swiper,
    swiperItem
  }
})
export default class FindSwiper extends Vue {
  @Prop() bannerlist!: object[];
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
