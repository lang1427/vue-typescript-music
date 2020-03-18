import {service} from './service'

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

// 注册/修改密码
export function registerAccount(captcha:string,phone:string,password:string,nikename:string){
    return service({
        url:'/register/cellphone',
        params:{
            captcha,
            phone,
            password,
            nikename
        }
    })
}

// 手机登录
export function phoneLogin(phone:string,password:string){
    return service({
        url:'/login/cellphone',
        params:{
            phone,
            password
        }
    })
}
// 邮箱登录
export function emailLogin(email:string,password:string){
    return service({
        url:'/login',
        params:{
            email,
            password
        }
    })
}