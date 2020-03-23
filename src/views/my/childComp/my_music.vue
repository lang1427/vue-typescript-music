<template>
  <div class="my-music">
    <div class="box">
      <h3 class="title">我的音乐</h3>
      <scroll-bar class="scroll-bar" direction="horizontal">
        <div class="list-items">
          <div class="item" v-for="item of InfoList" :key="item.title" @click="goMyMusic">
            <div :class="[item.ico,'icon']"></div>
            <div class="title">{{ item.title }}</div>
            <div class="mes">{{ item.mes }}</div>
          </div>
        </div>
      </scroll-bar>
    </div>
  </div>
</template>

<script lang='ts'>
import scrollBar from "@/components/common/scroll/scroll.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    scrollBar
  }
})
export default class MyMusic extends Vue {
  private InfoList: object[] = [
    { ico: "fa-heart", title: "我喜欢的音乐", mes: "心动模式" },
    { ico: "fa-eye-slash", title: "私人FM", mes: "最懂你的推荐" },
    { ico: "fa-tv", title: "热歌放映厅", mes: "好音乐看得见" },
    { ico: "fa-heartbeat", title: "私藏推荐", mes: "私藏冷门音乐" },
    { ico: "fa-venus-double", title: "因乐交友", mes: "找到音乐好友" }
  ];

  created() {}
  goMyMusic(){
    this.$toast('很遗憾，暂未开放此功能')
    return false
  }
}
</script>
<style scoped lang='less'>
.my-music {
  border-radius: 15px;
  background-color: white;
  margin-top: -20px;
  .box {
    padding: 0 15px;
    .title {
      padding: 10px 0;
    }
    .scroll-bar {
      margin-top: 10px;
      height: 150px;
      overflow: hidden;
      display: flex; // 重要的display：flex
      .list-items {
        display: flex;
        .item {
          width: 100px;
          position: relative;
          border-radius: 20px;
          background-color: rgba(0, 0, 0, 0.6);
          margin-left: 10px;
          &:first-child{
              margin-left: 0px;
              .icon{
                  color: red;
              }
          }
          .icon,.title,.mes{
              position: absolute;
              text-align: center;
              width: 100%;
              font-size: 12px;
              left: 50%;
              transform: translateX(-50%);
          }
            .icon{
                font-size:20px ;
                bottom:80px;
                color: rgb(230,230,230);

            }
            .title{
                bottom: 50px;
                color: rgb(240, 240, 240);
            }
            .mes{
                bottom: 10px;
                color: rgb(220, 220, 220);
            }
        }
      }
    }
  }
}
</style>