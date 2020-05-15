// 歌单相关 网络请求
import { service } from './service'

// 获取用户歌单
export function userSongsheet(id: number) {
    return service({
        url: '/user/playlist?timestamp=' + Date.now(),
        params: {
            uid: id
        }
    })
}
export interface IUserSongList {
    id: number
    name: string
    coverImgUrl: string
    trackCount: number
}
export class UserSongsheetInfo {
    private id: number
    private name: string
    private imgUrl: string
    private count: number
    constructor(userSongList: IUserSongList) {
        this.id = userSongList.id
        this.name = userSongList.name
        this.imgUrl = userSongList.coverImgUrl
        this.count = userSongList.trackCount
    }
}

/** 获取歌单详情  */
export function songsDetail(id: number) {
    return service({
        url: '/playlist/detail?timestamp=' + Date.now(),
        params: {
            id
        }
    })
}
interface ISongs {
    coverImgUrl: string
    name: string
    tags: string[]
    id: number
    description: string
    commentCount: number
    shareCount: number
}
export class SongsBaseInfo {
    imgUrl: string
    title: string
    tags: string[]
    singerId: number
    description: string
    commentCount: number
    shareCount: number
    constructor(songs: ISongs) {
        this.imgUrl = songs.coverImgUrl
        this.title = songs.name
        this.tags = songs.tags
        this.singerId = songs.id
        this.description = songs.description
        this.commentCount = songs.commentCount  // 评论数量
        this.shareCount = songs.shareCount  // 分享数量
    }
}


// 新建歌单
export function createSongSheet(name: string) {
    return service({
        url: "/playlist/create",
        params: {
            name
        }
    })
}

/* 对歌单中添加或删除歌曲
op: 从歌单增加单曲为 add, 删除为 del
pid: 歌单 id
tracks: 歌曲 id,可多个,用逗号隔开
*/
export function songsheetOperation(op: string, pid: number, tracks: string) {
    return service({
        url: '/playlist/tracks',
        params: {
            op,
            pid,
            tracks
        }
    })
}

// 删除歌单
export function deleteSongsheet(id: string) {
    return service({
        url: '/playlist/delete',
        params: {
            id
        }
    })
}


/** 更新歌单操作 */

// 更新歌单名
export function updateSongName(id: number, name: string) {
    return service({
        url: '/playlist/name/update?timestamp=' + Date.now(),
        params: {
            id,
            name
        }
    })
}
// 更新歌单标签
export function updateSongTags(id: number, tags: string) {
    return service({
        url: '/playlist/tags/update?timestamp=' + Date.now(),
        params: {
            id,
            tags
        }
    })
}
// 更新歌单描述
export function updateSongDesc(id: number, desc: string) {
    return service({
        url: '/playlist/desc/update?timestamp=' + Date.now(),
        params: {
            id,
            desc
        }
    })
}