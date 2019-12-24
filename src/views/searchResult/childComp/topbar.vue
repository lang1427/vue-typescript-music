<template>
  <navbar class="topbar">
    <div slot="left" @click="back">
      <span class="fa-arrow-left back"></span>
    </div>
    <div class="search-input-box" slot="center">
      <input class="search-input" type="text" v-model="$store.state.searchKeyWrold" />
    </div>
    <div slot="right" @click="empty">
      <span class="fa-close close"></span>
    </div>
  </navbar>
</template>

<script lang='ts'>
import navbar from "components/common/navbar/navbar.vue";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {
    navbar
  }
})
export default class Topbar extends Vue {
  // @Prop() searchContent!: string;
  // @Watch("searchContent")
  // changeSearchContent(newVla: string) {
  //   this.trueSearchContent = newVla;
  // }
  // /**使用data（trueSearchContent） 和 watch（searchContent） 实现prop的双向绑定  */
  // trueSearchContent: string = "";

  // private SearchContent: string = '';
  back() {
    this.$router.back();
  }
  empty() {
    // this.trueSearchContent = "";
    this.$store.commit("changeSearchKey", "");
  }
}
</script>

<style lang="less" scoped>
.topbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0;
  background-color: white;
  .back,
  .close {
    font-size: 20px;
  }
  .search-input-box {
    .search-input {
      width: 100%;
      height: 23px;
      line-height: 23px;
      padding-left: 5px;
      outline: none;
      border: none;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>