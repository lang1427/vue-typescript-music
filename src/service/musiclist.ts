import { service } from './service'

/** 获取专辑内容   （新碟返回的数据为专辑） 需要当前专辑的id*/
export function albumContent(id: number) {
  return service({
    url: '/album',
    params: {
      id
    }
  })
}
interface IAlbum {
  picUrl: string
  name: string
  artist: {
    name: string
    id: number
  }
  publishTime: number
  description: string
  info: {
    commentCount: number
    shareCount: number
  }
}
export class AlbumBaseInfo {
  imgUrl: string
  title: string
  singerName: string
  singerId: number
  publishTime: number
  description: string
  commentCount: number
  shareCount: number
  constructor(album: IAlbum) {
    this.imgUrl = album.picUrl
    this.title = album.name
    this.singerName = album.artist.name
    this.singerId = album.artist.id
    this.publishTime = album.publishTime
    this.description = album.description
    this.commentCount = album.info.commentCount  // 评论数量
    this.shareCount = album.info.shareCount  // 分享数量
  }
}
