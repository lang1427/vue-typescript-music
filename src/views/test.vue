<template>
  <div class="test">
    <h3>content-loader</h3>
    <content-loader secondaryColor="#0f0">
      <rect x="0" y="0" rx="3" ry="3" width="250" height="10" />
      <rect x="20" y="20" rx="3" ry="3" width="220" height="10" />
      <rect x="20" y="40" rx="3" ry="3" width="170" height="10" />
      <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
      <rect x="20" y="80" rx="3" ry="3" width="200" height="10" />
      <rect x="20" y="100" rx="3" ry="3" width="80" height="10" />
    </content-loader>
    <h3>facebook-loader</h3>
    <facebook-loader></facebook-loader>
    <h3>code-loader</h3>
    <code-loader></code-loader>
    <h3>bullet-list-loader</h3>
    <bullet-list-loader></bullet-list-loader>
    <h3>instagram-loader</h3>
    <instagram-loader></instagram-loader>
    <h3>list-loader</h3>
    <list-loader></list-loader>
  </div>
</template>

<script lang='ts'>
import {
  ContentLoader,
  FacebookLoader,
  CodeLoader,
  BulletListLoader,
  InstagramLoader,
  ListLoader
} from "vue-content-loader";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    ContentLoader,
    FacebookLoader,
    CodeLoader,
    BulletListLoader,
    InstagramLoader,
    ListLoader
  }
})
export default class Test extends Vue {
  mounted() {
    (document.getElementsByClassName("mini-player")[0] as any).style.display =
      "none";
  }
}
</script>
<style scoped lang='less'>
.test {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  background: white;
}
</style>