import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Longpress } from "@/directive/longpress";

import "font-awesome/css/font-awesome.css";

const app = createApp(App);

// Vue.config.productionTip = false

import loadingImage from "./assets/images/music-load.jpg";
import errorImage from "./assets/images/music-error.svg";

import VueLazyLoad from "vue3-lazyload";
app.use(VueLazyLoad, {
  loading: loadingImage,
  error: errorImage,
});

app.directive("longpress", Longpress);

// import Toast from "./components/common/toast/index.js";
// app.use(Toast);

// Vue.prototype.$bus = new Vue()

app.config.globalProperties.$filters = {
  finalPlayCount(playCount: number): number | string {
    if (playCount < 100000) {
      return playCount;
    } else if (playCount >= 100000 && playCount < 100000000) {
      return (playCount / 10000).toFixed(0) + "万";
    }
    return (playCount / 100000000).toFixed(0) + "亿";
  },
};

app.use(router);
app.use(store);

app.mount("#app");
