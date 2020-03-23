<template>
  <div class="Video">此功能暂未开放，感谢您的谅解！</div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Video extends Vue {
  created() {}
}
</script>
<style scoped lang='less'>
.Video {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 0;
  background: rgb(55, 61, 65);
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>