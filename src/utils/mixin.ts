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
      // 如果是播放列表中，点击的播放，则不执行以下操作，只需改变当前播放索引即可
      if ((<any>this).songlist) {
        let playArr: object[] = [];
        (this as any).songlist.forEach((item: any) => {
          playArr.push(new PlayList(item));
        });
        (this as any).$store.dispatch("changePlayList", playArr);
      }
    }
  }
}

// 添加单曲播放
import { ISongs } from '@/conf/playlist'
export const singlePlayMixin = {
  methods: {
    playSingle(item: ISongs) {
      let currentIndex = (this as any).$store.state.playList.findIndex((list: any) => {
        return list.id === item.songsId
      })
      if (currentIndex === -1) {
        (this as any).$store.commit('addSingle', new PlayList(item))
      } else {
        (this as any).$store.dispatch('changeCurrentPlayIndex', currentIndex)
      }
    }
  }
}

// 播放模式
import { EPlayMode } from '@/store/interface'
export const playModeMixin = {
  data() {
    return {
      modeName: ["列表循环", "单曲循环", "随机模式"]
    }
  },
  computed: {
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
  , methods: {
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

// 用户歌单管理者
import { userSongsheet, UserSongsheetInfo } from '@/service/songsheet'
import { getCookie } from './cookie'
export const userSongsManageMixin = {
  data() {
    return {
      userSongsheetList: []
    }
  },
  methods: {
    async getUserSongsheet() {
      if (getCookie("MUSIC_U") == undefined) return false;
      let res = await userSongsheet((this as any).userID);
      if (res.code === 200) {
        let arr = [];
        for (let item of res.playlist) {
          arr.push(new UserSongsheetInfo(item));
        }
        (this as any).userSongsheetList = arr;
      }
    }
  },
  computed: {
    userID(): number {
      return (this as any).$store.state.account.account && (this as any).$store.state.account.account.id || -1
    },
    // 我的歌单（排除 我喜欢） 我喜欢的歌单为用户歌单中第一个索引值
    mySongsList() {
      return (this as any).userSongsheetList.filter(
        (item: object[], index: number) => {
          return index != 0;
        }
      );
    }
  }
}