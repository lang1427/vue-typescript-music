import { service } from "./service";

/**获取轮播图数据
 *  0：pc端
 *  1.Android端
 *  2.iphone
 *  3.ipad
 *  */
export function getBanner(type: number = 0) {
  return service({
    url: "/banner",
    params: {
      type: type,
    },
  });
}
export class bannerData {
  readonly bannerId: string;
  readonly pic: string;
  readonly titleColor: string;
  readonly typeTitle: string;
  readonly url: string;
  constructor(bannerlist: any) {
    this.bannerId = bannerlist.bannerId;
    this.pic = bannerlist.pic;
    this.titleColor = bannerlist.titleColor;
    this.typeTitle = bannerlist.typeTitle;
    this.url = bannerlist.url;
  }
}

/**获取推荐歌单数据 */
export function getSonglist(limit: number = 30) {
  return service({
    url: "/personalized",
    params: {
      limit,
    },
  });
}

/**获取新碟上线数据 */
export function getNewAlbum() {
  return service({
    url: "/album/newest",
  });
}
