<template>
  <navbar class="topbar">
    <template #left>
      <span class="fa-arrow-left back" @click="back"></span>
    </template>
    <template class="search-input-box" #center>
      <input
        class="search-input"
        type="text"
        v-model="$store.state.searchKeyWrold"
      />
    </template>
    <template #right>
      <span class="fa-close close" @click="empty"></span>
    </template>
  </navbar>
</template>

<script lang="ts">
import navbar from "@/components/common/navbar/navbar.vue";
export default {
  // @Prop() searchContent!: string;
  // @Watch("searchContent")
  // changeSearchContent(newVla: string) {
  //   this.trueSearchContent = newVla;
  // }
  // /**使用data（trueSearchContent） 和 watch（searchContent） 实现prop的双向绑定  */
  // trueSearchContent: string = "";

  // private SearchContent: string = '';
  components: {
    navbar,
  },
  methods: {
    back() {
      this.$router.back();
    },
    empty() {
      // this.trueSearchContent = "";
      this.$store.commit("changeSearchKey", "");
    },
  },
};
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
