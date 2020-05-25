<template>
  <div class="add-song">
    <div class="search-tab">
      <div class="left" @click="back">
        <span class="fa-arrow-left back"></span>
      </div>
      <div class="search-input-box">
        <input
          class="search-input"
          type="text"
          v-model="searchContent"
          @focus="isActive=true"
          @blur="isActive=false"
        />
        <div class="fa-close clear-input" v-show="Flag" @click="clearInput"></div>
        <ul class="search-list" v-show="Flag && isActive">
          <li class="list-items" @click="getSearchResult(searchContent)">搜索“{{ searchContent }}”</li>
          <li
            class="list-items"
            @click="getSearchResult(item.keyword)"
            v-for="item of allMatch"
            :key="item.keyword"
          >
            <span class="fa-search"></span>
            {{ item.keyword }}
          </li>
        </ul>
      </div>
      <div class="slot"></div>
    </div>

    <div class="recently-played" v-if="searchRes.length===0">
      <h6 class="title">最近播放</h6>
      <ul class="list">
        <li
          class="list-items"
          v-for="item of playHistoryList"
          :key="item.id"
          @click="add(item.id)"
        >{{ item.name }}</li>
      </ul>
    </div>

    <search-res-scroll
      v-else
      :pullUpLoad="true"
      @pullingUp="nextSearchRes"
      ref="searchResScroll"
      class="scroll-wrapper"
      :style="bottomSty"
    >
      <div class="search-result">
        <ul class="result-list">
          <li class="items" v-for="(item,index) of searchRes" :key="index" @click="add(item.id)">
            <p class="name">{{ item.name }}</p>
            <p class="desc">{{ item.desc}}</p>
          </li>
        </ul>
      </div>
    </search-res-scroll>
  </div>
</template>

<script lang='ts'>
interface ISearchRes {
  id: number;
  name: string;
  album: {
    name: string;
  };
}
class SearchResClass {
  id: number;
  name: string;
  desc: string;
  constructor(songs: ISearchRes) {
    this.id = songs.id;
    this.name = songs.name;
    this.desc = songs.album.name;
  }
}
import { searchSuggest, search } from "@/service/search";
import { songsheetOperation } from "@/service/songsheet";
import searchResScroll from "@/components/common/scroll/scroll.vue";
import { Component, Vue, Watch } from "vue-property-decorator";
@Component({
  components: {
    searchResScroll
  }
})
export default class AddSong extends Vue {
  private searchContent: string = "";
  private searchRes: object[] = [];
  private allMatch: object[] = []; // 输入框搜索内容全匹配
  private isActive: boolean = true; // 用于动态显示搜索列表
  private timer: any = null;
  private page: number = 0;

  get Flag() {
    return !(this.searchContent === "");
  }
  get playHistoryList() {
    return this.$store.state.playHistory;
  }
  get bottomSty() {
    return this.searchRes.length !== 0 &&
      this.$store.state.playList.length !== 0
      ? { bottom: "50px" }
      : { bottom: "0px" };
  }

  clearInput() {
    this.searchContent = "";
  }
  back() {
    this.$router.back();
  }
  nextSearchRes() {
    let timer = window.setTimeout(() => {
      this.page++;
      this.getSearchResult(this.searchContent);
      (<any>this).$refs.searchResScroll.finishPullUp();
      window.clearTimeout(timer);
    }, 1000);
  }
  async getSearchResult(searchWord: string) {
    this.searchContent = searchWord;
    let res = await search(searchWord, 1, 30, this.page);
    if (res.code === 200) {
      if (!res.result.songs) return false;
      for (let item of res.result.songs) {
        this.searchRes.push(...[new SearchResClass(item)]);
      }
      this.$refs.searchResScroll && (<any>this).$refs.searchResScroll.refresh();
    }
  }
  async getSearchSuggest(keyworld: string) {
    let res = await searchSuggest(keyworld);
    if (res.code === 200) {
      this.allMatch = res.result.allMatch;
    }
  }
  async add(id: string) {
    let res = await songsheetOperation(
      "add",
      parseInt(<string>this.$route.query.id),
      id
    );
    if (res.code === 200) this.$toast("歌单添加歌曲成功");
    else this.$toast(res.message);
  }

  /** 防抖处理 */
  debounce(fn: any, delay: number = 500) {
    if (this.timer) clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      fn.call(this, this.searchContent);
    }, delay);
  }
  @Watch("searchContent")
  changeSearchContent(newVal: string) {
    if (newVal.trim().length !== 0) {
      this.debounce(this.getSearchSuggest);
    }
  }
}
</script>
<style scoped lang='less'>
.add-song {
  .search-tab {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    padding: 0;
    background-color: white;
    z-index: 999;
    height: 50px;
    line-height: 50px;
    display: flex;
    .left {
      width: 50px;
      text-align: center;
      .back,
      .singer {
        font-size: 20px;
      }
    }
    .search-input-box {
      position: relative;
      flex: 1;
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
        text-align: right;
        background-color: white;
      }
      .search-list {
        position: absolute;
        top: 50px;
        left: -35px;
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
    .slot {
      width: 15px;
    }
  }
  .recently-played {
    padding: 10px;
    .title {
      font-size: 12px;
      color: #999;
      font-weight: 400;
    }
    .list {
      padding: 8px 0;
      .list-items {
        padding-bottom: 7px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .scroll-wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    .search-result {
      .result-list {
        .items {
          padding: 10px 10px 0;
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &.desc {
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
    }
  }
}
</style>