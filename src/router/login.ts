const login = () => import("@/views/login/index.vue");

const phone = () => import("@/views/login/phone.vue");
const loginPhone = () => import("@/views/login/login-phone.vue");

const email = () => import("@/views/login/email.vue");

const register = () => import("@/views/login/register.vue");

export default [
  {
    path: "/login",
    name: "login",
    component: login,
    children: [
      {
        path: "phone",
        name: "phone",
        component: phone,
      },
      {
        path: "login-phone",
        name: "loginPhone",
        component: loginPhone,
      },
      {
        path: "email",
        name: "email",
        component: email,
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
];
