const my = () => import(/*webpackChunkName:'my'*/'@/views/my/index.vue')
const localMusic = () => import(/*webpackChunkName:'localMusic'*/'@/views/my/childRouter/local_music.vue')
const downloadManager = () => import(/*webpackChunkName:'downloadManager'*/'@/views/my/childRouter/download_manager.vue')
const radio = () => import(/*webpackChunkName:'radio'*/'@/views/my/childRouter/my_radio.vue')
const star = () => import(/*webpackChunkName:'star'*/'@/views/my/childRouter/my_star.vue')
const watchNewMusic = () => import(/*webpackChunkName:'watchNewMusic'*/'@/views/my/childRouter/watch_new_music.vue')

export default [
    {
        path: '/my',
        name: 'my',
        component: my,
        children: [
            {
                path: 'localmusic',
                name: 'localmusic',
                component: localMusic
            }, {
                path: 'downloadmanager',
                name: 'downloadmanager',
                component: downloadManager
            }, {
                path: 'radio',
                name: 'radio',
                component: radio
            }, {
                path: 'star',
                name: 'star',
                component: star
            }, {
                path: 'watchnewmusic',
                name: 'watchnewmusic',
                component: watchNewMusic
            }
        ]
    }
]

