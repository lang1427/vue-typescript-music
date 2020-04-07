<template>
  <div id="app">
    <h-menu />
    <!-- 仅保存singer路由时的缓存 -->
    <keep-alive include="singer">
      <router-view></router-view>
    </keep-alive>
    <player />
  </div>
</template>

<script lang="ts">
import hMenu from "components/content/head-menu/head-menu.vue";
import player from "views/player/index.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    hMenu,
    player
  }
})
export default class App extends Vue {
  mounted() {
    document.body.style.margin = "0px";
  }
  updated(){
    // 当有播放内容时，底部需要margin出距离 需要注意的是 这里的marginBottom设置的值并不会被替换vw单位 ，要在postcss.config.js中配置
    if(this.$store.state.playList.length!=0){
      (<any>document.querySelector('#app')).children[1].style.marginBottom = '50px'
    }
  }
}
</script>

<style lang="less">
</style>
