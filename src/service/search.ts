import { service } from './service'

/**获取热搜列表数据 */
export function hotSearch() {
  return service({
    url: '/search/hot/detail'
  })
}

/** 输入框搜索建议 */
export function searchSuggest(keywords: string, type: string = 'mobile') {
  return service({
    url: '/search/suggest',
    params: {
      keywords,
      type
    }
  })
}

/**搜索              (翻页的坑，没有正确理解后台APi接口)
 * keywords：搜索关键字
 * type：类型：（1.单曲  10.专辑   100.歌手  1000.歌单  1002.用户  1004.MV  1006.歌词  1009.电台  1014.视频  1018.综合）
 * limit：返回数量（默认30）
 * offset：页数（默认0）
 * */
export function search(
  keywords: string,
  type: number = 1,
  limit: number = 30,
  offset: number = 0 // offset： 翻页 offset*limit
) {
  return service({
    url: '/search',
    params: {
      keywords,
      limit,
      offset: offset * limit,
      type
    }
  })
}
