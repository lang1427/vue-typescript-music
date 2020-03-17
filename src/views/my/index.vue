<template>
  <div class="My">
    <my-head />
    <my-music />
    <my-songslist />
    <router-view />
  </div>
</template>

<script lang='ts'>
import myHead from "./childComp/head.vue";
import myMusic from "./childComp/my_music.vue";
import mySongslist from "./childComp/my_songslist.vue";
import { loginStatus,userInfo } from "@/service/login";
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "My",
  components: {
    myHead,
    myMusic,
    mySongslist
  }
})
export default class My extends Vue {
  created() {
    this.getLoginStatus();
  }
  async getLoginStatus() {
    let res = await loginStatus();
    if (res.code === 200) {
      console.log(res);
      this.getUserInfo()
    } else console.log(res.msg);
  }
  async getUserInfo(){
    let res = await userInfo()
    if(res.code===200) console.log(res)
  }
}
</script>
<style scoped lang='less'>
.My {
}
</style>