<template>
  <!-- 务必保持 APP节点下元素为 h-menu，router-view，player 因为播放容器列表设置了margin -->
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
import { Component, Vue, Watch } from "vue-property-decorator";
import {
  playerSetMarginBottom,
  playerRemoveMarginBottom
} from "@/conf/playlist";

@Component({
  components: {
    hMenu,
    player
  }
})
export default class App extends Vue {
  mounted() {
    document.body.style.margin = "0px";
    if (this.$store.getters.playListLength === 0) {
      playerRemoveMarginBottom();
    } else {
      if (this.$store.state.playList.length != 0 && this.$route.path.indexOf("/login") == -1) {
        playerSetMarginBottom();
      }
    }
  }

  // 当有播放内容时，底部需要margin出距离 需要注意的是 这里的marginBottom设置的值并不会被替换vw单位 ，要在postcss.config.js中配置
  // 登陆过程中不需要margin出距离
  @Watch("$store.getters.playListLength")
  changePlaylistLength(newVal: number) {
    if (newVal === 0) {
      playerRemoveMarginBottom();
    } else {
      if (this.$store.state.playList.length != 0 && this.$route.path.indexOf("/login") == -1) {
        playerSetMarginBottom();
      }
    }
  }
}
</script>

<style lang="less">
</style>
