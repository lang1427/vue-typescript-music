<template>
  <div class="search-result">
    <search-result-bar :searchContent="searchValue" />
    <div style="padding-top:50px"></div>
    <nav-bar class="navbar" :text="title" @changeHandler="itemClick">
      <section slot="综合">
        <overall :overallList="currentSearchResult.overallList" />
      </section>
      <section slot="单曲">
        <single :singleList="currentSearchResult.singleList.result.songs" />
      </section>
      <section slot="视频">
        <result-video :videoList="currentSearchResult.videoList.result.videos" />
      </section>
      <section slot="歌手">
        <singer :singerList="currentSearchResult.singerList.result.artists" />
      </section>
      <section slot="专辑">
        <album :albumList="currentSearchResult.albumList.result.albums" />
      </section>
      <section slot="歌单">
        <song-sheet :songSheetList="currentSearchResult.songSheetList.result.playlists" />
      </section>
      <section slot="主播电台">
        <radio />
      </section>
      <section slot="用户">
        <user :userList="currentSearchResult.userList.result.userprofiles" />
      </section>
    </nav-bar>
  </div>
</template>

<script lang='ts'>
/**
 *  1.初始状态（created） 默认请求 类型为综合 的数据
 *  2.点击对应的navbar，请求对应类型的数据
 * 问题 ：①.请求过后在来回点击的情况下，会再次触发请求，怎么解决？
 *  记录点击过navbar的状态 到一个数组中，进行判断，如果存在已点击，则return出去，否则发送对应类型请求
 *       ②.请求过来的数据怎么保存？（不能保存在一个空对象中，需要多个对象进行保存）
 *  在currentSearchResult对象中，定义每个类型对应的对象，将每一个请求过来的数据保存到对应的对象中
 *     怎么保存到对应的对象中？
 *  Object.keys(currentSearchResult) 遍历 对象，返回成为数组，得到currentSearchResult的每一个属性（对象）
 * 通过当前点击索引可以拿到遍历之后当前对应的currentSearchResult的对象 进行保存
 *
 */
interface ISearchResult {
  code: number;
  result: object;
}
interface ICurrentSearchResult {
  overallList: object;
  singleList: object;
  videoList: object;
  singerList: object;
  albumList: object;
  songSheetList: object;
  radioList: object;
  userList: object;
}
import searchResultBar from "./childComp/topbar.vue";
import navBar from "components/common/scrollNavBar/scroll-nav-bar.vue";
import overall from "./childComp/overall.vue";
import single from "./childComp/single.vue";
import resultVideo from "./childComp/video.vue";
import singer from "./childComp/singer.vue";
import album from "./childComp/album.vue";
import songSheet from "./childComp/song-sheet.vue";
import radio from "./childComp/radio.vue";
import user from "./childComp/user.vue";

import { search } from "@/service/search";

import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    searchResultBar,
    navBar,
    overall,
    single,
    resultVideo,
    singer,
    album,
    songSheet,
    radio,
    user
  }
})
export default class SearchResult extends Vue {
  private searchValue: string = "";
  private title: string[] = [
    "综合", // 1018
    "单曲", // 1
    "视频", // 1014
    "歌手", // 100
    "专辑", // 10
    "歌单", // 1000
    "主播电台", // 1009
    "用户" // 1002
  ];
  private searchType: number[] = [1018, 1, 1014, 100, 10, 1000, 1009, 1002];
  private currentSearchType: number = this.searchType[0];
  private currentSearchResult: ICurrentSearchResult = {
    overallList: {},
    singleList: {
      page: 1,
      result: {}
    },
    videoList: {
      page: 1,
      result: {}
    },
    singerList: {
      page: 1,
      result: {}
    },
    albumList: {
      page: 1,
      result: {}
    },
    songSheetList: {
      page: 1,
      result: {}
    },
    radioList: {
      page: 1,
      result: {}
    },
    userList: {
      page: 1,
      result: {}
    }
  };
  private count: number = 30;
  private clickedNavbar: number[] = [];

  created() {
    // 初次进入 获取 综合类型
    (<any>this).$bus.$on("searchResult", (keywords: string) => {
      this.searchValue = keywords;
      search(keywords, this.currentSearchType, 5, 1).then(
        (res: ISearchResult) => {
          if (res.code === 200) {
            this.currentSearchResult.overallList = res.result;
          }
        }
      );
    });
  }
  destroyed() {
    (<any>this).$bus.$off("searchResult");
  }

  itemClick(index: number) {
    this.currentSearchType = this.searchType[index];

    if (index === 0) {
      return;
    } else {
      let res = true;
      for (let item of this.clickedNavbar) {
        if (item === index) {
          res = false;
        }
      }

      if (res) {
        /** 发送请求，并保存已被点击的状态 */
        let page: number = 1;
        let searchResultArr = Object.keys(this.currentSearchResult);
        let currentResultArr = searchResultArr[index];
        search(this.searchValue, this.currentSearchType, this.count, page).then(
          (res: ISearchResult) => {
            if (res.code === 200) {
              (this.currentSearchResult as any)[currentResultArr].result =
                res.result;
            }
          }
        );
        this.clickedNavbar.push(index);
      }
    }
  }
  async getSearch(
    keywords: string,
    type: number,
    limit: number,
    offset: number
  ) {
    let res = await search(keywords, type, limit, offset);
    if (res.code === 200) {
      console.log(res);
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: white;
}
</style>