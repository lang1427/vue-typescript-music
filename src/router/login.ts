const login = () => import(/*webpackChunkName:'login'*/'@/views/login/index.vue')
const phone = () => import(/*webpackChunkName:'phone'*/'@/views/login/phone.vue')
const email = () => import(/*webpackChunkName:'email'*/'@/views/login/email.vue')

export default [
    {
        path: '/login',
        name: 'login',
        component: login,
        children: [
            {
                path: 'phone',
                name: 'phone',
                component: phone
            },
            {
                path: 'email',
                name: 'email',
                component: email
            }
        ]
    }

]