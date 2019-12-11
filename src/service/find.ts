import { service } from './service'

/**获取轮播图数据
 *  0：pc端
 *  1.Android端
 *  2.iphone
 *  3.ipad
 *  */
export function getBanner(type: number = 0) {
  return service({
    url: '/banner',
    params: {
      type: type
    }
  })
}

export class bannerData {
  private readonly bannerId: string
  private readonly pic: string
  private readonly titleColor: string
  private readonly typeTitle: string
  private readonly url: string
  constructor(bannerlist: any) {
    this.bannerId = bannerlist.bannerId
    this.pic = bannerlist.pic
    this.titleColor = bannerlist.titleColor
    this.typeTitle = bannerlist.typeTitle
    this.url = bannerlist.url
  }
}
