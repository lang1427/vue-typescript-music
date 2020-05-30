import Vue from 'vue'

Vue.directive('longpress', {
    bind(el, binding) {

        let timer: any = null

        el.addEventListener('touchstart', function () {
            if (timer === null) {
                timer = window.setTimeout(() => {
                    binding.value.methods(binding.value.params)
                }, 300)
            }
        })

        el.addEventListener('touchmove', function () {
            window.clearTimeout(timer)
            timer = null
        })

        el.addEventListener('touchend', function () {
            window.clearTimeout(timer)
            timer = null
        })

        // var event = new CustomEvent("longpress", {"detail":{"message":'长按事件'}})
        // el.dispatchEvent(event)
    }
})

/**
 *

 使用方式：
params可以是 undefined, string, number, boolean, array, object 类型的值

  html:

    <div style="padding:30px;background:green;" v-longpress="{'methods':didi,'params':'123'}" >自定义事件</div>


  script:

    didi(id:string){
        console.log(id)
        console.log('didi')
    }


 *
 */