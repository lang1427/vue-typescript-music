import { service } from './service'

// 登陆状态
export function loginStatus() {
    return service({
        url: '/login/status'
    })
}
export class UserBaseInfo {
    userId!: number
    nickname!: string
    avatarUrl!: string
    constructor(profile: IProfile) {
        this.userId = profile.userId
        this.nickname = profile.nickname
        this.avatarUrl = profile.avatarUrl
    }
}
export interface IProfile {
    userId: number,
    nickname: string,
    avatarUrl: string
}

// 获取用户详情
export function userDetail(id: number) {
    return service({
        url: '/user/detail',
        params: {
            uid: id
        }
    })
}

