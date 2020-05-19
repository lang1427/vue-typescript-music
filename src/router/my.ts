const my = () => import(/*webpackChunkName:'my'*/'@/views/my/index.vue')
const playHistory = ()=>import(/*webpackChunkName:'playHistory'*/'@/views/my/childRouter/play_history.vue')
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
                path:'playhistory',
                name:'playHistory',
                component:playHistory
            },
            {
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

