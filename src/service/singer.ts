import { service } from '@/service/service'

/** 获取100个热门歌手 */
export function getSinger() {
  return service({
    url: '/top/artists?limit=100'
  })
}
export interface ISinger {
  id: number
  name: string
  picUrl: string
  pin: string
}
export class SingerData {
  id!: number
  name!: string
  imgUrl!: string

  constructor(artists: ISinger) {
    this.id = artists.id
    this.name = artists.name
    this.imgUrl = artists.picUrl
  }
}

/** 获取歌手单曲（可获得部分信息和热门歌曲） 用于歌手详情页 */
export function getSingerDetail(id: number) {
  return service({
    url: '/artists',
    params: {
      id
    }
  })
}
export interface ISingerHeadInfo {
  musicSize?: number
  albumSize?: number
  mvSize?: number
  img1v1Url?: string
}

/** 获取歌手专辑 */
export function getSingerAlbum(
  id: number,
  offset: number = 0,
  limit: number = 50
) {
  return service({
    url: '/artist/album',
    params: {
      id,
      offset: limit * offset,
      limit
    }
  })
}

/** 获取歌手MV */
export function getSingerMv(id: number) {
  return service({
    url: '/artist/mv',
    params: {
      id
    }
  })
}
