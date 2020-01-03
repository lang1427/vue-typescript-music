<template>
  <div class="singer">
    <top-bar />
    <list-view :data="artists" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import topBar from './childComp/topbar.vue'
import ListView from 'components/content/scroll-list-view/scroll-list-view.vue'

import { getSinger, SingerData, ISinger } from '@/service/singer'

const pinyin = require('pinyin')
const HOT_NAME = '热门'
const HOT_COUNT = 10

@Component({
  components: {
    topBar,
    ListView
  }
})
export default class Singer extends Vue {
  private artists: object[] = []

  created() {
    this.getSingerData()
  }

  async getSingerData() {
    let res = await getSinger()
    if (res.code === 200) {
      let s = res.artists
      /** 添加一个字段（pin：首字母的拼音大写） */
      s.map((item: ISinger) => {
        let py = pinyin(item.name[0], {
          style: pinyin.STYLE_FIRST_LETTER
        })
        ;(<any>item).pin = py[0][0].toUpperCase()
      })
      this.artists = this.normalizeSinger(s)
    }
  }

  /** 重置数据：过滤掉一些不需要的数据，并整合数据的分布（title，items） */
  normalizeSinger(list: ISinger[]) {
    let map: any = {
      hot: {
        title: HOT_NAME,
        items: []
      }
    }
    list.forEach((item: ISinger, index: number) => {
      /** 热门 */
      if (index < HOT_COUNT) {
        map.hot.items.push(new SingerData(item))
      }
      /** 所有 */
      const key = item.pin
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(new SingerData(item))
    })
    let hot = [] // 热门数据，包含title，items
    let all = [] // 所有数据，包含title，items
    for (let key in map) {
      if (map[key].title === HOT_NAME) {
        hot.push(map[key])
      } else if (map[key].title.match(/[A-Z]/)) {
        all.push(map[key])
      }
    }
    // 所有大写字母排序
    all.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(all)
  }
}
</script>

<style lang="less" scoped>
.singer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: white;
}
</style>
