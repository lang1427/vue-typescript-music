import { service } from './service'

// 登陆状态
export function loginStatus(){
    return service({
        url:'/login/status'
    })
}
export class UserBaseInfo{
    userId!:number
    nickname!:string
    avatarUrl!:string
    constructor(profile:IProfile){
        this.userId = profile.userId
        this.nickname = profile.nickname 
        this.avatarUrl = profile.avatarUrl
    }
}
export interface IProfile{
    userId:number,
    nickname:string,
    avatarUrl:string
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function userInfo(){
    return service({
        url:'/user/subcount'
    })
}