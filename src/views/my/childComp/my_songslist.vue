<template>
  <div class="my_songslist">
    <div class="tab-head">
      <div
        :class="['songs','create-songs',isCreateShow ? '' : 'noActive']"
        @click="isCreateShow = true"
      >
        创建歌单
        <span class="count">0</span>
      </div>
      <div
        :class="['songs','star-songs',isCreateShow ? 'noActive' : '']"
        @click="isCreateShow = false"
      >
        收藏歌单
        <span class="count">0</span>
      </div>
      <div class="fa-ellipsis-v songs more" @click="moreShow=true"></div>
    </div>
    <div class="tab-content">
      <div class="create-content" v-show="isCreateShow">
        <div class="export-songs">+&nbsp;&nbsp; 导入外部歌单</div>
      </div>
      <div class="star-content" v-show="!isCreateShow">
        <div class="no-star">暂无收藏的歌单</div>
      </div>
    </div>

    <!-- 更多选项的  底部弹出层 -->
    <morePopup :popupShow="moreShow" @hide="moreShow = false">
      <ul class="selector">
        <li class="title">请选择</li>
        <li class="item"> <span class="fa-plus-square-o ioc"></span> 创建新歌单</li>
        <li class="item"> <span class="fa-file-text-o ioc"></span> 歌单管理</li>
        <li class="item"> <span class="fa-cut ioc"></span> 截图导入歌单</li>
        <li class="item"> <span class="fa-undo ioc"></span> 恢复歌单</li>
      </ul>
    </morePopup>
  </div>
</template>

<script lang='ts'>
import morePopup from '@/components/common/bottomPopup/bottom-popup.vue'
import { Component, Vue } from "vue-property-decorator";
@Component({
  components:{
    morePopup
  }
})
export default class MySongslist extends Vue {
  private isCreateShow: boolean = true;
  private moreShow:boolean = false;

  created() {}
}
</script>
<style scoped lang='less'>
.my_songslist {
  padding: 15px;
  .tab-head {
    
    .songs {
      display: inline-block;
      position: relative;
      font-weight: 600;
       width: 80px;
      .count {
        position: absolute;
        left: 57px;
        bottom: -1px;
        font-size: 12px;
      }
    }
    .noActive {
      opacity: 0.8;
    }
    .create-songs {

    }
    .star-songs {
      
    }
    .more {
      float: right;
      width: 30px;
      text-align: center;
      color: #999;
    }
  }
  .tab-content {
    padding: 10px 0;
    .create-content {
      .export-songs {
        border: 1px solid #ccc;
        border-radius: 2px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #999;
        font-size: 12px;
      }
    }
    .star-content {
      .no-star {
        text-align: center;
        color: #999;
        font-size: 12px;
      }
    }
  }
  .selector{

    .title{
      font-size: 12px;
      color: #999;
      padding:10px;
    }
    .item{
      padding:0 10px;
      height: 35px;
      line-height: 35px;
      font-size: 13px;
      color: #666;
      border-top:1px solid #dedede;
      .ioc{
        padding: 0 5px;
      }
    }
  }
}
</style>