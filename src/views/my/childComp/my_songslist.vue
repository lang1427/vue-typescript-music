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
      <div class="fa-ellipsis-v more" @click="moreShow=true"></div>
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
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>3</li>
        <li>4</li>
        <li>3</li>
        <li>5</li>
         <li>4</li>
        <li>3</li>
        <li>5</li>
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
    display: flex;
    .songs {
      position: relative;
      font-weight: 600;
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
      width: 80px;
    }
    .star-songs {
      flex: 1;
    }
    .more {
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
}
</style>