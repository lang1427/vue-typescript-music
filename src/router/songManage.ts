const deleteSong = () => import(/*webpackChunkName:'deleteSong'*/'@/views/songManage/delete-song.vue')
const updateSong = () => import(/*webpackChunkName:'updateSong'*/'@/views/songManage/updateSong/index.vue')
const editSongName = () => import(/*webpackChunkName:'editSongName'*/'@/views/songManage/updateSong/edit-song-name.vue')
const editSongTags = () => import(/*webpackChunkName:'editSongTags'*/'@/views/songManage/updateSong/edit-song-tags.vue')
const editSongDesc = () => import(/*webpackChunkName:'editSongDesc'*/'@/views/songManage/updateSong/edit-song-desc.vue')
const addSong = ()=>import(/*webpackChunkName:'addSong'*/'@/views/songManage/add-song.vue')

export default [
    {
        path: '/songmanage/delete',
        name: 'deleteSong',
        component: deleteSong
    },
    {
        path: '/songmanage/update',
        name: 'updateSong',
        component: updateSong,
        children: [
            {
                path: 'editname',
                name: 'editSongName',
                component: editSongName
            }, {
                path: 'edittags',
                name: 'editSongTags',
                component: editSongTags
            }, {
                path: 'editdesc',
                name: 'editSongDesc',
                component: editSongDesc
            }
        ]
    },{
        path:'/songmanage/add',
        name:'addSong',
        component:addSong
    }
]