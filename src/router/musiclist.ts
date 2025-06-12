const album = () => import("views/musicList/index.vue");
const songsheet = () => import("views/musicList/index.vue");
const topList = () => import("views/musicList/index.vue"); // 排行榜

export default [
  {
    path: "/album/:id",
    name: "album",
    component: album,
  },
  {
    path: "/songsheet/:id",
    name: "songsheet",
    component: songsheet,
  },
  {
    path: "/toplist/:id",
    name: "toplist",
    component: topList,
  },
];
