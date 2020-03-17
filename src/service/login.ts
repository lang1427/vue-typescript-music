import {service} from './service'

// 登陆状态
export function loginStatus(){
    return service({
        url:'/login/status'
    })
}

/** 登录操作相关 */

// 发送验证码
export function sendVerifyCode(phone:string){
    return service({
        url:'/captcha/sent',
        params:{
            phone
        }
    })
}
// 验证验证码
export function testVerifyCode(phone:string,captcha:string){
    return service({
        url:'/captcha/verify',
        params:{
            phone,
            captcha
        }
    })
}
// 检测手机号码是否已注册
export function testIsRegister(phone:string){
    return service({
        url:'/cellphone/existence/check',
        params:{
            phone
        }
    })
}

// 邮箱登陆
export function emailLogin(email:string,password:string){
    return service({
        url:'/login',
        params:{
            email,
            password
        }
    })
}



/** 用户相关信心 */

// 获取用户信息 , 歌单，收藏，mv, dj 数量
export function userInfo(){
    return service({
        url:'/user/subcount'
    })
}