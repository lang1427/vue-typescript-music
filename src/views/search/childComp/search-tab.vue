<template>
  <navbar class="search-tab">
    <div slot="left" @click="back">
      <span class="fa-arrow-left back"></span>
    </div>
    <div class="search-input-box" slot="center">
      <input
        class="search-input"
        type="text"
        v-model="searchContent"
        @click="activeInput"
      />
      <div class="fa-close clear-input" v-show="Flag" @click="clearInput"></div>
      <ul class="search-list" v-show="Flag && isActive">
        <li class="list-items" @click="goSearchResult(searchContent)">
          搜索“{{ searchContent }}”
        </li>
        <li
          class="list-items"
          @click="goSearchResult(item.keyword)"
          v-for="item of allMatch"
          :key="item.keyword"
        >
          <span class="fa-search"></span>
          {{ item.keyword }}
        </li>
      </ul>
    </div>
    <div slot="right" @click="goSinger">
      <span class="fa-user singer"></span>
    </div>
  </navbar>
</template>

<script lang="ts">
import navbar from 'components/common/navbar/navbar.vue'
import { searchSuggest } from '@/service/search'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {
    navbar
  }
})
export default class SearchTab extends Vue {
  private searchContent: string = ''
  private allMatch: object[] = [] // 输入框搜索内容全匹配
  private isActive: boolean = true // 用于动态显示搜索列表
  private timer: any = null

  get Flag() {
    return !(this.searchContent === '')
  }
  /**
   *  当滑动热搜榜时，如果当前的搜索列表（isActive）为true状态，则设置为失效状态
   */
  mounted() {
    ;(<any>this).$bus.$on('isShow', (state: boolean) => {
      this.isActive = state
    })
  }
  destroyed() {
    ;(<any>this).$bus.$off('isShow')
  }

  // 点击input输入框时，如果当前的搜索列表（isActive）为false状态，则激活搜索列表
  activeInput() {
    if (!this.isActive) {
      this.isActive = true
    }
  }
  clearInput() {
    this.searchContent = ''
  }
  back() {
    this.$router.back()
  }
  goSinger() {
    this.$router.push('/singer')
  }

  goSearchResult(searchWord: string) {
    this.$store.commit('changeSearchKey', searchWord)
    this.$store.dispatch('addHistorySearchArr', searchWord)
    this.$router.push(`/searchresult?keywords=${searchWord}`)
  }

  async getSearchSuggest(keyworld: string) {
    let res = await searchSuggest(keyworld)
    if (res.code === 200) {
      this.allMatch = res.result.allMatch
    }
  }

  /** 防抖处理 */
  debounce(fn: any, delay: number = 500) {
    if (this.timer) clearTimeout(this.timer)
    this.timer = window.setTimeout(() => {
      fn.call(this, this.searchContent)
    }, delay)
  }
  @Watch('searchContent')
  changeSearchContent(newVal: string) {
    if (newVal.trim().length !== 0) {
      this.debounce(this.getSearchSuggest)
    }
  }
}
</script>

<style lang="less" scoped>
.search-tab {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0;
  background-color: white;
  z-index: 999;
  .back,
  .singer {
    font-size: 20px;
  }
  .search-input-box {
    position: relative;
    .search-input {
      // width: 100%;
      // 使用 计算属性 设置input的宽度，与padding-right 实现input的完美切合
      width: calc(100% - 25px);
      height: 23px;
      line-height: 23px;
      padding-left: 5px;
      padding-right: 25px;
      outline: none;
      border: none;
      border-bottom: 1px solid #333;
    }
    .clear-input {
      position: absolute;
      right: -5px;
      top: 0;
      bottom: 12px;
      font-size: 20px;
      width: 25px;
      text-align: center;
      background-color: white;
    }
    .search-list {
      position: absolute;
      top: 50px;
      left: -50px;
      right: 0;
      overflow: hidden;
      box-shadow: 1px 1px 10px #bbb;
      background-color: white;
      .list-items {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        border-bottom: 1px solid #dedede;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:last-child {
          border-bottom: none;
        }
        .fa-search {
          color: #999;
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
