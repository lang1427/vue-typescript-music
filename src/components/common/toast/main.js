import Vue from 'vue'
import toast from './toast.vue'

/**
 * 可传入的参数：
 *      message： 提示消息
 *      offset： 顶部偏移量
 */

const ToastConstructor = Vue.extend(toast)  // 创建一个Toast构造器


let instance; // 实例对象
let instances = [] // 存放所有的实例对象


const interval = 16   // 两个相连Toast弹出消息的DOM元素间隔
let seed = 1
let zIndex = 2020
const offsetTop = 60 //  默认 距离顶部的偏移量

const Toast = function (options = options || {}) {

    if (Vue.prototype.$isServer) return  // 判断是否为服务端渲染，如果是则不往后执行了

    if (typeof options === 'string') {   // 如果当前用户调用 $toast() 时 传入的是一个字符串类型的数据 只直接让它等同于 message
        options = {
            message: options
        }
    }

    let id = 'toast_message_' + seed++ // 记录每一个toast的id （id递增）
    let userOnClose = options.onClose

    options.onClose = function () {    // 关闭方法
        Toast.close(id, userOnClose)
    }

    instance = new ToastConstructor({
        data: options   // 实例化时需要把options放进去，否则toast组件中data的值都为初始默认值
    }) // 实例化构造器

    instance.id = id;   // 将当前id挂载在当前实例中，在后续通过id进行操作

    instance.$mount() // 将该实例挂载到 新创建的 div中

    document.body.appendChild(instance.$el) // 将该 div 放在body元素内

    instance.message = options.message ? options.message : instance.message;


    let verticalOffset = options.offset || offsetTop
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + interval
    })

    instance.offsetTop = verticalOffset
    instance.visible = true
    instance.$el.style.zIndex = zIndex++

    instances.push(instance)

    return instance
}

// 关闭当前元素
Toast.close = function (id, userOnClose) {
    let len = instances.length // 得到实例中的个数
    let index = -1 // 初始化当前index
    let removeHeight;
    for (let i = 0; i < len; i++) {
        if (id === instances[i].id) {  // 如果toast的id等于当前实例对象的id
            removeHeight = instances[i].$el.offsetHeight // 得到当前实例的dom对象距离顶部的高度
            index = i
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i])       // 关闭当前元素 
            }
            instances.splice(i, 1) // 删除当前元素 
            break;
        }
    }
    if (len <= 1 || index === - 1 || index > instances.length - 1) return  // 不满足条件 则不往下执行
    // 因为移除了某个元素，需要统一对后面的元素设置为上一个元素的高度
    for (let i = index; i < len - 1; i++) {

        let dom = instances[i].$el

        dom.style['top'] = parseInt(dom.style['top'], 10) - removeHeight - interval + 'px'
    }
}
// 关闭所有元素
Toast.closeAll = function () {
    for (let i = instanceps.length - 1; i >= 0; i--) {
        instanceps[i].close()
    }
}


export default Toast

