<template>
  <div class="mv">
    <mv-list :mvList="mvList" />
  </div>
</template>

<script lang='ts'>
import mvList from "components/content/mv-list/mv-list.vue";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    mvList
  }
})
export default class Mv extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  mvList!: object[];
}
</script>

<style lang="less" scoped>
.mv {
  background-color: white;
}
</style>