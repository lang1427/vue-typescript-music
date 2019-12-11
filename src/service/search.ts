import { service } from './service'

/**获取热搜列表数据 */
export function hotSearch() {
  return service({
    url: '/search/hot/detail'
  })
}
