import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

import FastClick from 'fastclick'
;(<any>FastClick).attach(document.body)

import LazyLoad from 'vue-lazyload'
Vue.use(LazyLoad, {
  loading: require('./assets/images/music-load.jpg'),
  error: require('./assets/images/music-error.svg')
})

import Toast from './components/common/toast/index.js'
Vue.use(Toast)

Vue.prototype.$bus = new Vue()

Vue.filter('finalPlayCount', (playCount: number): number | string => {
  if (playCount < 100000) {
    return playCount
  } else if (playCount >= 100000 && playCount < 100000000) {
    return (playCount / 10000).toFixed(0) + '万'
  }
  return (playCount / 100000000).toFixed(0) + '亿'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
