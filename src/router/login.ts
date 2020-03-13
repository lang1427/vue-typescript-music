const login = () => import(/*webpackChunkName:'login'*/'@/views/login/index.vue')
const phone = () => import(/*webpackChunkName:'phone'*/'@/views/login/phone.vue')
const email = () => import(/*webpackChunkName:'email'*/'@/views/login/email.vue')
const inputVerifyCode = ()=>import(/*webpackChunkName:'inputVerifyCode'*/'@/views/login/login-code.vue')

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
            },{
                path:'input-verify-code',
                name:'inputVerifyCode',
                component:inputVerifyCode
            }
        ]
    }

]