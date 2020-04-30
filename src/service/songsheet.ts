// 歌单相关 网络请求
import { service } from './service'

// 获取用户歌单
export function userSongsheet(id:number){
    return service({
        url:'/user/playlist',
        params:{
            uid:id
        }
    })
}
// 新建歌单
export function createSongSheet(name:string){
    return service({
        url:"/playlist/create",
        params:{
            name
        }
    })
}