<template>
  <div class="hot-search-list" @touchstart="touchStart">
    <h3 class="title">热搜榜</h3>
    <div v-if="hotsearch.length != 0" class="hot-list">
      <div
        class="list-item"
        v-for="(item, index) of hotsearch"
        :key="index"
        @click="goSearchResult(item.searchWord)"
      >
        <span class="ordinal" :class="index < 3 ? 'top-three' : ''">{{
          index + 1
        }}</span>
        <div class="info">
          <p class="search-word" :class="index < 3 ? 'top-three' : ''">
            {{ item.searchWord }}
            <img class="icon" v-if="item.iconUrl" :src="item.iconUrl" />
          </p>
          <p class="desc">{{ item.content }}</p>
        </div>
        <span class="score">{{ item.score }}</span>
      </div>
    </div>
    <loading v-show="$store.state.loadingShow" />
  </div>
</template>

<script lang="ts">
import { loadingMixin } from '@/utils/mixin'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({ mixins: [loadingMixin] })
export default class HotSearchList extends Vue {
  @Prop({
    default() {
      return []
    }
  })
  hotsearch!: object[]

  touchStart() {
    ;(<any>this).$bus.$emit('isShow', false)
  }

  // private keywords: string = "";

  // beforeDestroy() {   使用 vuex 将搜索关键字 发射出去
  //   (<any>this).$bus.$emit("searchResult", this.keywords);
  // }

  goSearchResult(searchWord: string) {
    /** $bus事件总线第一次不能执行的问题
     * 在页面（search）通过$emit方法传递数据然后跳转路由的时候，其实页面（searchresult）的$on监听还没有建立，因此无法得到数据！
     *  解决办法： 在页面（search）的beforeDestroy或者destroyed钩子函数中emit数据，在页面（searchresult）的beforeCreate、created或者beforeMount钩子函数中建立$on监听事件
     */
    // this.$nextTick(function() {  // 这里的$nextTick 无效
    //   this.$bus.$emit("searchResult", searchWord);
    // });
    // this.keywords = searchWord;
    this.$store.commit('changeSearchKey', searchWord)
    this.$store.dispatch('addHistorySearchArr', searchWord)
    this.$router.push(`/searchresult?keywords=${searchWord}`)
  }
}
</script>

<style lang="less" scoped>
.hot-search-list {
  .hot-list {
    .list-item {
      display: flex;
      height: 50px;
      align-items: center;
      .ordinal {
        width: 30px;
        color: #999;
        &.top-three {
          color: @klColor!important;
        }
      }
      .info {
        flex: 1;
        .search-word {
          &.top-three {
            font-weight: 700;
          }
          .icon {
            height: 15px;
          }
        }
        .desc {
          font-size: 12px;
          color: #999;
        }
      }
      .score {
        text-align: right;
        font-size: 12px;
        width: 70px;
        color: #999;
      }
    }
  }
}
</style>
