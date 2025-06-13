<template>
  <div class="head-menu">
    <navbar>
      <div slot="left">
        <span :class="['fa-list-ul', isMyPageColor]"></span>
      </div>
      <div class="center" slot="center">
        <span
          :class="[
            'menu-item',
            { 'item-active': index === currentIndex },
            isMyPageColor,
          ]"
          v-for="(item, index) of headTitles"
          @click="menuClick(index)"
          :key="item"
          >{{ item }}</span
        >
      </div>
      <div slot="right" @click="goSearch">
        <span :class="['fa-search', isMyPageColor]"></span>
      </div>
    </navbar>
  </div>
</template>

<script lang="ts">
import navbar from "components/common/navbar/navbar.vue";
export default {
  // private headTitles: string[] = ["我的", "嘤乐馆", "视频"];
  // private currentIndex: number = 1;

  data() {
    return {
      headTitles: ["我的", "嘤乐馆", "视频"],
      currentIndex: 1,
    };
  },

  methods: {
    menuClick(index: number) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.$router.push("/my");
          break;
        case 1:
          this.$router.push("/find");
          break;
        case 2:
          this.$router.push("/video");
          break;
      }
    },

    goSearch() {
      this.$router.push("/search");
    },
  },

  computed: {
    isMyPageColor() {
      return this.$route.path === "/my" ? "isMyPageColor" : "";
    },
  },

  watch: {
    "$route.path": (newVal: string) => {
      switch (newVal) {
        case "/my":
          this.currentIndex = 0;
          break;
        case "/find":
          this.currentIndex = 1;
          break;
        case "/video":
          this.currentIndex = 2;
          break;
      }
    },
  },

  // @Watch('$route.path')
  // changeRouter(newVal:string) {
  //   switch(newVal){
  //     case '/my':
  //       this.currentIndex = 0
  //       break;
  //     case '/find':
  //       this.currentIndex = 1
  //       break;
  //     case '/video':
  //       this.currentIndex = 2
  //       break;
  //   }
  // }
};
</script>

<style lang="less" scoped>
.head-menu {
  .fa-list-ul,
  .fa-search {
    width: 100%;
    height: 50px;
    display: inline-block;
    font-size: 20px;
  }
  .center {
    display: flex;
    height: 50px;
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
.isMyPageColor {
  color: rgb(222, 222, 222);
  background-color: rgb(1, 1, 1);
}
</style>
