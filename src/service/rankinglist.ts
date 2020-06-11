// 排行榜相关

import { service } from './service'

interface IRankData {
    id: number
    name: string
    coverImgUrl: string
    updateFrequency: string
    tracks: [
        {
            first: string
            second: string
        }
    ]
}
export class RankData {
    id: number
    name: string
    coverImgUrl: string
    updateFrequency: string
    songsInfo: object
    constructor(list: IRankData) {
        this.id = list.id
        this.name = list.name
        this.coverImgUrl = list.coverImgUrl
        this.updateFrequency = list.updateFrequency
        this.songsInfo = list.tracks
    }
}
// 所有榜单摘要
export function topListDetail() {
    return service({
        url: '/toplist/detail'
    })
}


// 排行榜对应的idx
export const rankIdx = [
    "云音乐新歌榜",
    "云音乐热歌榜",
    "网易原创歌曲榜",
    "云音乐飙升榜",
    "云音乐电音榜",
    "UK排行榜周榜",
    "美国Billboard周榜",
    "KTV嗨榜",
    "iTunes榜",
    "Hit FM Top榜",
    "日本Oricon周榜",
    "韩国Melon排行榜周榜",
    "韩国Mnet排行榜周榜",
    "韩国Melon原声周榜",
    "中国TOP排行榜(港台榜)",
    "中国TOP排行榜(内地榜)",
    "香港电台中文歌曲龙虎榜",
    "华语金曲榜",
    "中国嘻哈榜",
    "法国 NRJ EuroHot 30周榜",
    "台湾Hito排行榜",
    "Beatport全球电子舞曲榜",
    "云音乐ACG音乐榜",
    "云音乐说唱榜",
    "云音乐古典音乐榜",
    "云音乐电音榜",
    "抖音排行榜",
    "新声榜",
    "云音乐韩语榜",
    "英国Q杂志中文版周榜",
    "电竞音乐榜",
    "云音乐欧美热歌榜",
    "云音乐欧美新歌榜",
    "说唱TOP榜"
]
// 获取当前点击的排行榜数据
export function topList(idx: number) {
    return service({
        url: '/top/list',
        params: {
            idx
        }
    })
}
interface IRankbaseinfo {
    coverImgUrl: string
    name: string
    tags: string[]
    id: number
    description: string
    updateTime:number
    commentCount: number
    shareCount: number
}
// 排行榜数据基本信息
export class RankBaseInfo {
    imgUrl: string
    title: string
    tags: string[]
    singerId: number
    description: string
    publishTime:number
    commentCount: number
    shareCount: number
    constructor(rank: IRankbaseinfo) {
        this.imgUrl = rank.coverImgUrl
        this.title = rank.name
        this.tags = rank.tags
        this.singerId = rank.id
        this.description = rank.description
        this.publishTime = rank.updateTime
        this.commentCount = rank.commentCount  // 评论数量
        this.shareCount = rank.shareCount  // 分享数量
    }
}
