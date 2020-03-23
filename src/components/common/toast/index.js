import Toast from './main'

export default{
     install: function(Vue,opts = {}){

        Vue.prototype.$toast = Toast
    
    }
}

