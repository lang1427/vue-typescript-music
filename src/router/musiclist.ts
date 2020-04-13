
const album = () => import(/*webpackChunkName:'album'*/'views/musicList/index.vue')
const songsheet = () => import(/*webpackChunkName:'songsheet'*/'views/musicList/index.vue')

export default [
    {
        path: '/album/:id',
        name: 'album',
        component: album
    },
    {
        path: '/songsheet/:id',
        name: 'songsheet',
        component: songsheet
    }
]