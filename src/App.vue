<template>
  <div id="app">
    <h-menu />
    <router-view></router-view>
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
export default class App extends Vue {}
</script>

<style lang="less">
#app {
}
</style>
