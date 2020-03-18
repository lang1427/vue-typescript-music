import { service } from './service'

// 登陆状态
export function loginStatus(){
    return service({
        url:'/login/status'
    })
}
export class UserBaseInfo{
    userId!:number
    nikename!:string
    avatar!:string
    constructor(profile:IProfile){
        this.userId = profile.userId
        this.nikename = profile.nikename 
        this.avatar = profile.avatar
    }
}
export interface IProfile{
    userId:number,
    nikename:string,
    avatar:string
}

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function userInfo(){
    return service({
        url:'/user/subcount'
    })
}