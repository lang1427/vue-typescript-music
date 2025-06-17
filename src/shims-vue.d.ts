import { ComponentCustomProperties } from "vue";
import { Router, RouteLocationNormalizedLoaded } from "vue-router";
import { Store } from "vuex";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

import { ComponentCustomProperties } from "vue";

// 定义 $filters 的类型
declare module "vue" {
  // 组件自定义属性
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteLocationNormalizedLoaded;
    $store: Store;
    $filters: {
      finalPlayCount(playCount: number): number | string;
      // 其他过滤器...
    };
    $toast(message: string);
  }
}

declare module "*.svg" {
  const content: any;
  export default content;
}
