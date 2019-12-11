import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const find = () => import(/*webpackChunkName:'find'*/ 'views/find/index.vue')

const routes = [
  {
    path: '/',
    redirect: '/find'
  },
  {
    path: '/find',
    name: 'find',
    component: find
  }
]

const router = new VueRouter({
  routes
})

export default router
