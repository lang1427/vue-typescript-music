const my = () => import("@/views/my/index.vue");
const playHistory = () => import("@/views/my/childRouter/play_history.vue");
const radio = () => import("@/views/my/childRouter/my_radio.vue");
const star = () => import("@/views/my/childRouter/my_star.vue");
const watchNewMusic = () =>
  import("@/views/my/childRouter/watch_new_music.vue");

export default [
  {
    path: "/my",
    name: "my",
    component: my,
    children: [
      {
        path: "playhistory",
        name: "playHistory",
        component: playHistory,
      },
      {
        path: "radio",
        name: "radio",
        component: radio,
      },
      {
        path: "star",
        name: "star",
        component: star,
      },
      {
        path: "watchnewmusic",
        name: "watchnewmusic",
        component: watchNewMusic,
      },
    ],
  },
];
