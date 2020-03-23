<template>
  <div class="My">
    <my-head :userBaseinfo="userBaseInfo" />
    <my-music />
    <my-songslist />
    <router-view />
  </div>
</template>

<script lang='ts'>
import myHead from "./childComp/head.vue";
import myMusic from "./childComp/my_music.vue";
import mySongslist from "./childComp/my_songslist.vue";
import { loginStatus, userInfo,userPlayList } from "@/service/user";
import { UserBaseInfo, IProfile } from "@/service/user";
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
  private userBaseInfo: IProfile = {
    userId: -1,
    nickname: "",
    avatarUrl: ""
  };
  created() {
    this.getLoginStatus();
  }
  async getLoginStatus() {
    try {
      let res = await loginStatus();
      if (res.code === 200) {
        this.userBaseInfo = new UserBaseInfo(res.profile);
        // this.getUserInfo()
        // this.getUserPlayList()
      } 
    } catch (err) {
      console.log('loginStatus'+err)
    }
  }
  async getUserInfo() {
    let res = await userInfo();
    if (res.code === 200) console.log(res);
  }
  async getUserPlayList(){
    let res = userPlayList(this.userBaseInfo.userId)
    if(res.code===200){
      console.log(res)
    }
  }
}
</script>
<style scoped lang='less'>
.My {
}
</style>