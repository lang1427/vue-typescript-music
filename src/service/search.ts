import { service } from './service'

/**获取热搜列表数据 */
export function hotSearch() {
  return service({
    url: '/search/hot/detail'
  })
}

/** 搜索结果 keywords:搜索关键字
 * artist : 歌手
 * album : 专辑
 * mv : MV视频
 * radio : 电台
 */
export function searchResultData(keywords: string) {
  return service({
    url: '/search/multimatch',
    params: {
      keywords
    }
  })
}
