<template>
  <navbar class="topbar">
    <template #left>
      <span class="fa-arrow-left back"></span>
    </template>
    <template #center @click="back">
      <h2 class="title">歌手分类</h2>
    </template>
  </navbar>
</template>

<script lang="ts">
import navbar from "@/components/common/navbar/navbar.vue";
export default {
  components: {
    navbar,
  },
  methods: {
    back() {
      this.$router.back();
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
  z-index: 999;
  .back {
    font-size: 20px;
  }
  .title {
    font-size: 16px;
  }
}
</style>
