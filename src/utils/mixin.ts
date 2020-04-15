import loading from 'components/common/loading/loading.vue'
export const loadingMixin = {
  components: {
    loading
  }
}

// 播放方法play(index)  设置当前的播放索引
import { PlayList } from "@/conf/playlist";
export const playMixin = {
  methods: {
    play(index: number) {
      (this as any).$store.dispatch("changeCurrentPlayIndex", index);
      let playArr: object[] = [];
      (this as any).songlist.forEach((item: any) => {
        playArr.push(new PlayList(item));
      });
      (this as any).$store.dispatch("changePlayList", playArr);
    }
  }
}
import { ISongs } from '@/conf/playlist'
// 添加单曲播放
export const singlePlayMixin = {
  methods: {
    playSingle(item: ISongs) {
      (this as any).$store.commit('addSingle', new PlayList(item))
    }
  }
}

import { EPlayMode } from '@/store/interface'
// 播放模式
export const playModeMixin = {
  data(){
    return {
       modeName : ["列表循环", "单曲循环", "随机模式"]
    }
  },
  computed:{
     modeICON() {
      let mode = "listloop";
      switch ((this as any).$store.state.playMode) {
        case 0:
          mode = "listloop";
          break;
        case 1:
          mode = "singleloop";
          break;
        case 2:
          mode = "random";
          break;
      }
      return mode;
    }
  }
  ,methods:{
    changeMode() {
      switch ((this as any).$store.state.playMode) {
        case 0:
          (this as any).$store.commit("changePlayMode", EPlayMode.singleLoop);
          break;
        case 1:
          (this as any).$store.commit("changePlayMode", EPlayMode.random);
          break;
        case 2:
          (this as any).$store.commit("changePlayMode", EPlayMode.listLoop);
          break;
      }
      if ((this as any).isShow != undefined) {
        (this as any).isShow = true;
        let timer = window.setTimeout(() => {
          (this as any).isShow = false;
          window.clearTimeout(timer);
        }, 1000);
      }
    }
  }
}