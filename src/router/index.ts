import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const find = () => import(/*webpackChunkName:'find'*/ 'views/find/index.vue')
const search = () =>
  import(/*webpackChunkName:'search'*/ 'views/search/index.vue')

const routes = [
  {
    path: '/',
    redirect: '/find'
  },
  {
    path: '/find',
    name: 'find',
    component: find
  },
  {
    path: '/search',
    name: 'search',
    component: search
  }
]

const router = new VueRouter({
  routes
})

export default router
