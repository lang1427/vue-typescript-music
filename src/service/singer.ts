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
