import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const find = () => import(/*webpackChunkName:'find'*/ 'views/find/index.vue')
const search = () =>
  import(/*webpackChunkName:'search'*/ 'views/search/index.vue')
const searchResult = () =>
  import(/*webpackChunkName:'searchResult'*/ 'views/searchResult/index.vue')
const singer = () =>
  import(/*webpackChunkName:'singer'*/ 'views/singer/index.vue')
const singerDetail = () =>
  import(/*webpackChunkName:'singerDetail'*/ 'views/singerDetail/index.vue')

const test = () => import('views/test.vue')

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
  },
  {
    path: '/searchresult',
    name: 'searchresult',
    component: searchResult
  },
  {
    path: '/singer',
    name: 'singer',
    component: singer,
    children: [
      {
        path: 'detail/:id',
        name: 'singerDetail',
        component: singerDetail
      }
    ]
  },

  {
    path: '/test',
    component: test
  }
]

const router = new VueRouter({
  routes
})

export default router
