const deleteSong = () => import("@/views/songManage/delete-song.vue");
const updateSong = () => import("@/views/songManage/updateSong/index.vue");
const editSongName = () =>
  import("@/views/songManage/updateSong/edit-song-name.vue");
const editSongTags = () =>
  import("@/views/songManage/updateSong/edit-song-tags.vue");
const editSongDesc = () =>
  import("@/views/songManage/updateSong/edit-song-desc.vue");
const addSong = () => import("@/views/songManage/add-song.vue");

export default [
  {
    path: "/songmanage/delete",
    name: "deleteSong",
    component: deleteSong,
  },
  {
    path: "/songmanage/update",
    name: "updateSong",
    component: updateSong,
    children: [
      {
        path: "editname",
        name: "editSongName",
        component: editSongName,
      },
      {
        path: "edittags",
        name: "editSongTags",
        component: editSongTags,
      },
      {
        path: "editdesc",
        name: "editSongDesc",
        component: editSongDesc,
      },
    ],
  },
  {
    path: "/songmanage/add",
    name: "addSong",
    component: addSong,
  },
];
