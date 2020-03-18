<template>
  <div id="app">
    <h-menu />
    <!-- 仅保存singer路由时的缓存 -->
    <keep-alive include="singer">
      <router-view></router-view>
    </keep-alive>
    <!-- <div class="">
      <a href="http://www.beian.miit.gov.cn" target="_blank"> 赣ICP备19003694号-1</a>
    </div> -->
  </div>
</template>

<script lang="ts">
import hMenu from "components/content/head-menu/head-menu.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    hMenu
  }
})
export default class App extends Vue {

  mounted(){
    document.body.style.margin = '0px'
  }
}
</script>

<style lang="less">
</style>
