<template>
  <div class="head-menu">
    <navbar>
      <div slot="left">
        <span class="fa-list-ul"></span>
      </div>
      <div class="center" slot="center">
        <span class="menu-item" v-for="item of headTitles" :key="item">{{
          item
        }}</span>
      </div>
      <div slot="right">
        <span class="fa-search"></span>
      </div>
    </navbar>
  </div>
</template>

<script lang="ts">
import navbar from 'components/common/navbar/navbar.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    navbar
  }
})
export default class HeadMenu extends Vue {
  private headTitles: string[] = ['我的', '发现', '云村', '视频']
}
</script>

<style lang="less" scoped>
.head-menu {
  background-color: @klColor;
  .fa-list-ul,
  .fa-search {
    width: 100%;
    height: 100%;
    display: inline-block;
    text-align: center;
    font-size: 20px;
  }
  .center {
    display: flex;
    .menu-item {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
