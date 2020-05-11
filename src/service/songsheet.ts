// 歌单相关 网络请求
import { service } from './service'

// 获取用户歌单
export function userSongsheet(id: number) {
    return service({
        url: '/user/playlist?timestamp='+ Date.now(),
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
export function deleteSongsheet(id:number){
    return service({
        url:'/playlist/delete',
        params:{
            id
        }
    })
}