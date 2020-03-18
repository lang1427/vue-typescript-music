const login = () => import(/*webpackChunkName:'login'*/'@/views/login/index.vue')

const phone = () => import(/*webpackChunkName:'phone'*/'@/views/login/phone.vue')
const loginPhone = ()=>import(/*webpackChunkName:'loginPhone'*/'@/views/login/login-phone.vue')

const email = () => import(/*webpackChunkName:'email'*/'@/views/login/email.vue')

const register = ()=>import(/*webpackChunkName:'register'*/'@/views/login/register.vue')


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
                path:'login-phone',
                name:'loginPhone',
                component:loginPhone
            },
            {
                path: 'email',
                name: 'email',
                component: email
            }
        ]
    },
    {
        path:'/register',
        name:'register',
        component:register
    }

]