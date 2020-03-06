<template>
  <div class="head-menu">
    <navbar>
      <div slot="left">
        <span class="fa-list-ul"></span>
      </div>
      <div class="center" slot="center">
        <span
          class="menu-item"
          :class="{'item-active':index===currentIndex}"
          v-for="(item,index) of headTitles"
          @click="menuClick(index)"
          :key="item"
        >{{ item }}</span>
      </div>
      <div slot="right" @click="goSearch">
        <span class="fa-search"></span>
      </div>
    </navbar>
  </div>
</template>

<script lang="ts">
import navbar from "components/common/navbar/navbar.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    navbar
  }
})
export default class HeadMenu extends Vue {
  private headTitles: string[] = ["我的", "发现", "云村", "视频"];
  private currentIndex: number = 1;

  menuClick(index: number) {
    this.currentIndex = index;
    switch(index){
      case 0:
        this.$router.push('/my')
        break
      case 1:
        this.$router.push('/find')
        break
      case 2:
        this.$router.push('/cloudVillage')
        break
      case 3:
        this.$router.push('/video')
        break
    }
  }

  goSearch() {
    this.$router.push("/search");
  }
}
</script>

<style lang="less" scoped>
.head-menu {
  // background-color: @klColor;
  .fa-list-ul,
  .fa-search {
    width: 100%;
    height: 100%;
    display: inline-block;
    font-size: 20px;
  }
  .center {
    display: flex;
    .menu-item {
      flex: 1;
      text-align: center;
      &.item-active {
        font-weight: 700;
        font-size: 15px;
      }
    }
  }
}
</style>
