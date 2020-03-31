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
}
</script>

<style lang="less">
</style>
