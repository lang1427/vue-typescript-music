/* 封装cookie */

// 获取cookie
export function getCookie(name:string) {
    var arr:any;
    var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')

    if (document.cookie.match(reg)) {
        arr = document.cookie.match(reg);
        return (arr[2])
    } else {
        return null
    }
}

// 设置cookie,增加到vue实例方便全局调用
export function setCookie(cName:string, value:string, expiredays:number) {
    var exdate:any = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
}

// 删除cookie
export function delCookie(name:string) {
    var exp:any = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = getCookie(name)
    if (cval != null) {
        document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
}