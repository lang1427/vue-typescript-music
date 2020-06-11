import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决 vue-router 新版本 重复点击路由 浏览器 Console 输出的异常 
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: string) {
  return (<any>originalPush).call(this, location).catch((err: string) => err)
}

import myRoutes from './my'
import loginRouters from './login'
import musicListRouters from './musiclist'
import songManage from './songManage'
const find = () => import(/*webpackChunkName:'find'*/ 'views/find/index.vue')
const rankingList = () => import(/*webpackChunkName:'rankingList'*/'views/rankingList/index.vue')
const video = () => import(/*webpackChunkName:'video'*/'views/video/index.vue')

const search = () =>
  import(/*webpackChunkName:'search'*/ 'views/search/index.vue')
const searchResult = () =>
  import(/*webpackChunkName:'searchResult'*/ 'views/searchResult/index.vue')
const singer = () =>
  import(/*webpackChunkName:'singer'*/ 'views/singer/index.vue')
const singerDetail = () =>
  import(/*webpackChunkName:'singerDetail'*/ 'views/singerDetail/index.vue')

const comment = () => import(/*webpackChunkName:'comment'*/'@/views/comment/index.vue')

const test = () => import('views/test.vue')

const routes = [
  ...myRoutes,
  ...loginRouters,
  ...musicListRouters,
  ...songManage,
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
    path: '/rankingList',
    name: 'rankingList',
    component: rankingList
  },
  {
    path: '/video',
    name: 'video',
    component: video
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
    /**
     * 子路由所带来的无穷问题？
     * 1.当请求歌手详情时，还会跟着请求热门歌手的数据
          对location.href进行正则匹配，过滤多余请求
     * 2.歌手详情页滚动时，滚动到最底部 可见 热门歌手，需对其隐藏（问题最大的地方）
          在歌手详情页对热门歌手数据中的元素添加隐藏类，
          离开歌手详情页发送bus事件，通知热门歌手页去除隐藏类，这里并不能使用keep-alive提供的activated生命钩子函数
     * 3.歌手详情返回到热门歌手时，没有热门歌手数据可见
          对热门歌手页进行keep-alive
     */
    children: [
      {
        path: 'detail/:id',
        name: 'singerDetail',
        component: singerDetail
      }
    ]
  },
  {
    path: '/comment/:type',
    name: 'comment',
    component: comment
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
