<template>
  <!-- 务必保持 APP节点下元素为 h-menu，router-view，player 因为播放容器列表设置了margin -->
  <div id="app">
    <h-menu />
    <!-- 仅保存singer路由时的缓存 -->
    <keep-alive include="singer">
      <div class="router-wrapper">
        <!-- 添加包装元素  transition 和 keep-alive 只能有一个直接子节点 -->
        <router-view></router-view>
      </div>
    </keep-alive>
    <player />
  </div>
</template>

<script lang="ts">
import hMenu from "@/components/content/head-menu/head-menu.vue";
import player from "@/views/player/index.vue";
import {
  playerSetMarginBottom,
  playerRemoveMarginBottom,
} from "@/conf/playlist";
export default {
  components: {
    hMenu,
    player,
  },
  created() {
    let first_loading = document.getElementById("first-loading");
    if (!!first_loading) {
      document.body.removeChild(<HTMLElement>first_loading);
    }
  },
  mounted() {
    document.body.style.margin = "0px";
  },
  updated() {
    // 界面DOM渲染完成的margin距离设置
    if (this.$store.getters.playListLength === 0) {
      playerRemoveMarginBottom();
    } else {
      if (
        this.$route.path.indexOf("/login") == -1 &&
        !this.$route.path.match(/^\/comment\/((?:[^\/]+?))(?:\/(?=$))?$/i)
      ) {
        playerSetMarginBottom();
      }
    }
  },

  // 当有播放内容时，底部需要margin出距离 需要注意的是 这里的marginBottom设置的值并不会被替换vw单位 ，要在postcss.config.js中配置
  // 登陆,评论 不需要margin出距离
  // 有无播放容器时设置的margin
  watch: {
    "$store.getters.playListLength": {
      handler(newVal: number) {
        if (newVal === 0) {
          playerRemoveMarginBottom();
        } else {
          if (
            this.$route.path.indexOf("/login") == -1 &&
            !this.$route.path.match(/^\/comment\/((?:[^\/]+?))(?:\/(?=$))?$/i)
          ) {
            playerSetMarginBottom();
          }
        }
      },
      immediate: true,
    },
  },

  // @Watch("$store.getters.playListLength", { immediate: true })
  // changePlaylistLength(newVal: number) {
  //   if (newVal === 0) {
  //     playerRemoveMarginBottom();
  //   } else {
  //     if (
  //       this.$route.path.indexOf("/login") == -1 &&
  //       !this.$route.path.match(/^\/comment\/((?:[^\/]+?))(?:\/(?=$))?$/i)
  //     ) {
  //       playerSetMarginBottom();
  //     }
  //   }
  // }
};
</script>

<style lang="less"></style>
