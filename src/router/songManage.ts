const deleteSong = () => import(/*webpackChunkName:'deleteSong'*/'@/views/songManage/delete-song.vue')

export default [
    {
        path: '/songmanage/delete',
        name: 'deleteSong',
        component: deleteSong
    }
]