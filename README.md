# vue-typescript-music

## Vue+TypeScript better-music-webapp (音乐项目)

[English](./README.en.md)

**线上访问地址**  [网易云音乐在线项目体验入口](http://47.93.187.37/)

**项目解析上线啦** [源码解析地址](https://blog.csdn.net/weixin_42661283/article/details/106552202)

> vue-content-loader [TypeScript Support](https://github.com/egoist/vue-content-loader/pull/13)

> 项目不断完善进行中 持续更新...

##### 欢迎 Star，Issues

1. **您的 Star，是我不断更新维护的动力！！！**
2. **若在使用过程中，存在某些问题，欢迎 Issues**

> 详细注释 完美解读 你值得拥有
> 零UI组件库，纯手打造

### 后端 API 依赖

`NeteaseCloudMusicApi 3.29.0`

1. [接口下载地址](https://github.com/Binaryify/NeteaseCloudMusicApi)
2. [接口 API 文档地址](https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=neteasecloudmusicapi)

### 涉及相关技术

1. Vue全家桶  `vue 2.6.10`    `vue-router 3.1.3` `vuex 3.1.2`   `vue-cli 3.10.0`
2. 网络请求 `axios`
3. `better-scroll 1.13.2` 
4. js强大的Api库 `lodash`
5. 日期格式化插件 `moment`
6. 汉语拼音 `pinyin`
7. 图片懒加载 `vue-lazyload`
8. 图标 `svg`  `font-awesome`
9. 布局 `flex`
10. `ES6语法`


### 示例效果图
<details>
<summary> 推荐直接访问线上地址 (图片文件大,可能加载不出来)</summary>

![搜索页、搜索结果](./src/doc/images/search.gif)
![热门歌手页](./src/doc/images/singer.gif)
![音乐播放](./src/doc/images/player.gif)
![新建歌单](./src/doc/images/createSong.gif)
![评论](./src/doc/images/comment.gif)

</details>


### 界面、功能模块介绍

<details>
<summary></summary>

**我的页面**

- [x] 登录
- [x] 播放历史
- [ ] 我的电台
- [ ] 我的收藏
- [ ] 关注新歌
- [ ] 我的音乐
- [ ] 我喜欢的音乐

**默认页（音乐馆）**

- [x] banner 轮播图
- [x] 推荐歌单
- [x] 新碟
- [ ] 推荐新音乐
- [ ] 推荐电台
- [x] 排行榜
- [ ] 推荐节目
- [ ] 推荐 MV


**搜索页面**

- [x] 热搜榜
- [x] 历史记录
- [x] 歌手分类
- [x] 搜索输入框功能

**搜索结果**

- [x] 搜索结果导航
- [x] 综合
- [x] 单曲
- [x] 视频
- [x] 歌手
- [x] 专辑
- [x] 歌单
- [x] 电台
- [x] 用户

**歌手详情**

- [x] 主页
- [x] 专辑
- [x] MV

**评论界面**
- [x] 评论点赞、取消点赞
- [x] 发表评论
- [x] 回复评论
- [x] 复制评论
- [x] 删除评论

**音频播放**

- [x] 播放
- [x] 上下首播放
- [x] 滑动切换播放
- [x] 播放模式
- [x] 播放列表
- [x] 收藏歌单
- [x] 删除播放列表
- [x] 下载当前播放音乐
- [x] 歌词

**视屏页面**

`暂未开放`

</details>


### 文件目录结构树

```

 ├─ assets       //  静态资源文件目录
 | ├─ images
 | | ├─  singer-bg.png      // 歌手背景图
 | | ├─  music-load.jpg     // 歌曲加载中背景图
 | | ├─  music-ico.svg      
 | | ├─  music-error.svg    // 歌曲加载失败背景图
 | | ├─  logo.png           
 | | └─  login-avatar.jpg  // 默认用户登陆头像
 | ├─ less
 | | └─  reset.less         // 重置的less样式
 ├─ components              // 组件库
 | ├─ common                // 公共的组件库
 | | ├─ bottomPopup         // 封装的底部弹出层
 | | | └─  bottom-popup.vue
 | | ├─ gridview            // 封装的网格图
 | | | └─  grid-view.vue
 | | ├─ kl-confirm          // 封装的确认框
 | | | └─  kl-confirm.vue
 | | ├─ kl-dialog           // 封装的对话框
 | | | └─  kl-dialog.vue
 | | ├─ loading             // 封装的loading
 | | | ├─  loading.vue
 | | | └─  loading.gif
 | | ├─ message             // 封装的消息提示
 | | | └─  message.vue
 | | ├─ navbar              // 封装的导航栏
 | | | └─  navbar.vue
 | | ├─ noticeBar           // 封装的 消息通知
 | | | └─  notice-bar.vue   
 | | ├─ scroll              // 对better-scroll 二次封装
 | | | └─  scroll.vue
 | | ├─ scrollNavBar        // better-scroll 二次封装的可滚动菜单与可滚动内容
 | | | └─  scroll-nav-bar.vue
 | | ├─ swiper              // 轮播图
 | | | ├─  SwiperItem.vue
 | | | └─  Swiper.vue
 | | ├─ toast               // 封装的 轻提示 插件
 | | | ├─  toast.vue
 | | | ├─  main.js
 | | | ├─  index.js
 | | | └─  index.d.ts
 | ├─ content               // 此项目需要的组件
 | | ├─ album-list           // 专辑列表组件
 | | | ├─  album-list.vue
 | | | └─  album-list-items.vue
 | | ├─ create-song-dialog      // 新建歌单弹框组件
 | | | └─  index.vue
 | | ├─ head-menu           // 顶部菜单组件
 | | | └─  head-menu.vue
 | | ├─ mv-list             // mv列表组件
 | | | ├─  mv-list.vue
 | | | └─  mv-list-items.vue
 | | ├─ progress-bar        // 线性进度条组件
 | | | └─  progress-bar.vue
 | | ├─ progress-circle     // 环形进度条组件
 | | | └─  progress-circle.vue
 | | ├─ scroll-list-view    // 内容+右侧拼音联动组件
 | | | └─  scroll-list-view.vue
 | | ├─ single-list         // 歌手列表组件
 | | | ├─  single-list.vue
 | | | └─  single-list-items.vue
 | | ├─ songlist-operation      // 歌曲列表操作组件
 | | | └─  index.vue
 | | ├─ tab-bar         
 | | | └─  tab-bar.vue
 | | ├─ verify-code         // 验证码组件
 | | | └─  verify-code.vue
 ├─ conf
 | ├─  songsInfo.ts         // 歌曲信息数据处理
 | └─  playlist.ts          // 播放列表数据处理
 ├─ doc
 | ├─ images
 | | ├─  singer.gif
 | | ├─  search.gif
 | | ├─  player.gif
 | | ├─  createSong.gif
 | | └─  comment.gif
 ├─ router                  // 路由模块
 | ├─  songManage.ts        //  歌单管理者路由（添加，修改，删除）歌单等
 | ├─  my.ts                //  我的相关  路由
 | ├─  musiclist.ts         // 专辑，歌单 路由
 | ├─  login.ts             // 登陆注册相关路由
 | └─  index.ts             // 主路由模块
 ├─ service                 // 网络请求模块
 | ├─  user.ts              // 用户请求相关
 | ├─  songsheet.ts         // 歌单请求相关
 | ├─  singer.ts            // 歌手请求相关
 | ├─  service.ts           // 二次封装axios
 | ├─  search.ts            // 搜索请求相关
 | ├─  player.ts            // 音乐请求相关
 | ├─  rankinglist.ts       // 排行榜请求相关
 | ├─  musiclist.ts         // 专辑请求相关
 | ├─  login.ts             // 登陆请求相关
 | ├─  find.ts              // 主页请求相关
 | └─  comment.ts           // 评论请求相关
 ├─ store                   //  vuex模块
 | ├─  mutatioins.ts
 | ├─  interface.ts
 | ├─  index.ts
 | ├─  getters.ts
 | └─  actions.ts
 ├─ utils                   // 工具类
 | ├─  mixin.ts             // 混入操作相关代码
 | ├─  lyric-parser.js      // 歌词解析库
 | ├─  longpress.ts         // 长按事件
 | ├─  html.ts              // html编码转义 反转义
 | ├─  formatDate.ts        // 日期格式化
 | ├─  dom.ts               // dom操作
 | ├─  debounce.ts          // 防抖
 | └─  cookie.ts            
 ├─ views
 | ├─ comment               // 评论组件
 | | ├─ childComp
 | | | ├─  main.vue
 | | | ├─  head.vue
 | | | └─  footer.vue
 | | └─  index.vue
 | ├─ find                  // 主页组件
 | | ├─ childComp
 | | | ├─  recommend.vue
 | | | ├─  recmend-songlist.vue
 | | | ├─  new-album.vue
 | | | └─  find-swiper.vue
 | | ├─ image
 | | | ├─  paihang.svg
 | | | ├─  mv.svg
 | | | ├─  music.svg
 | | | ├─  jiemu.svg
 | | | └─  diantai.svg
 | | └─  index.vue
 | ├─ login                 // 登陆组件
 | | ├─  register.vue
 | | ├─  phone.vue
 | | ├─  login-phone.vue
 | | ├─  index.vue
 | | └─  email.vue
 | ├─ musicList             //  歌单 专辑 组件
 | | ├─ childComp
 | | | ├─  songlist.vue
 | | | ├─  head.vue
 | | | └─  bg-info.vue
 | | └─  index.vue  
 | ├─ my                   // 我的  组件
 | | ├─ childComp
 | | | ├─  my_songslist.vue
 | | | ├─  my_music.vue
 | | | └─  head.vue
 | | ├─ childRouter
 | | | ├─  watch_new_music.vue
 | | | ├─  play_history.vue
 | | | ├─  my_star.vue
 | | | └─  my_radio.vue
 | | └─  index.vue
 | ├─ player            // 音乐播放器组件
 | | ├─ childComp
 | | | ├─  player-list.vue
 | | | ├─  mini-player.vue
 | | | └─  full-player.vue
 | | ├─ image
 | | | ├─  singleloop.png
 | | | ├─  random.png
 | | | ├─  musiclist.svg
 | | | └─  listloop.png
 | | ├─  readme.ts
 | | └─  index.vue
 | ├─ rankingList        // 排行榜组件
 | | └─  index.vue
 | ├─ search        // 搜索组件
 | | ├─ childComp
 | | | ├─  search-tab.vue
 | | | ├─  search-history.vue
 | | | └─  hot-search-list.vue
 | | └─  index.vue
 | ├─ searchResult  // 搜索结果组件
 | | ├─ childComp
 | | | ├─  video.vue
 | | | ├─  user.vue
 | | | ├─  topbar.vue
 | | | ├─  song-sheet.vue
 | | | ├─  single.vue
 | | | ├─  singer.vue
 | | | ├─  radio.vue
 | | | ├─  overall.vue
 | | | └─  album.vue
 | | └─  index.vue
 | ├─ singer        // 热门歌手组件
 | | ├─ childComp
 | | | └─  topbar.vue
 | | └─  index.vue
 | ├─ singerDetail      // 歌手详情组件
 | | ├─ childComp
 | | | ├─  mv.vue
 | | | ├─  home.vue
 | | | ├─  head.vue
 | | | └─  album.vue
 | | └─  index.vue
 | ├─ songManage        // 歌单管理者组件
 | | ├─ updateSong          
 | | | ├─ image
 | | | | ├─  theme.svg
 | | | | ├─  style.svg
 | | | | ├─  scene.svg
 | | | | ├─  language.svg
 | | | | └─  emotion.svg
 | | | ├─  index.vue
 | | | ├─  edit-song-tags.vue       // 修改歌单tags组件
 | | | ├─  edit-song-name.vue       // 修改歌单名称组件
 | | | └─  edit-song-desc.vue       // 修改歌单描述组件
 | | ├─  delete-song.vue            // 删除歌单组件
 | | └─  add-song.vue               // 歌单添加歌曲组件
 | ├─ video             // 视频组件
 | | └─  index.vue
 | └─  test.vue         // 测试
 ├─  shims-vue.d.ts
 ├─  shims-tsx.d.ts
 ├─  main.ts
 └─  App.vue        //  主入口
 ```

---


> 笔者最近正在学node相关知识体系，正在打造 koa + typescript 实现美食天下项目 欢迎感兴趣的小伙伴参考指点 
[美食天下项目](https://github.com/lang1427/gourmet-world)


## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```
