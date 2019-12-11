<template>
  <navbar class="search-tab">
    <div slot="left" @click="back">
      <span class="fa-arrow-left back"></span>
    </div>
    <div class="search-input-box" slot="center">
      <input class="search-input" type="text" v-model="searchContent" placeholder />
    </div>
    <div slot="right">
      <span class="fa-user singer"></span>
    </div>
  </navbar>
</template>

<script lang='ts'>
import navbar from "components/common/navbar/navbar.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    navbar
  }
})
export default class SearchTab extends Vue {
  private searchContent: string = "123";

  back() {
    this.$router.back();
  }
}
</script>

<style lang="less" scoped>
.search-tab {
  .back,
  .singer {
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