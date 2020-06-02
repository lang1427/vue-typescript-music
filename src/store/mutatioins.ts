import { IState, EPlayMode } from './interface'
export const mutations = {
  changeSearchKey(state: IState, newVal: string) {
    state.searchKeyWrold = newVal
    window.sessionStorage.setItem('searchKeyWrold', newVal)
  },
  addHistorySearch(state: IState, newVal: string) {
    ; (<string[]>state.searchHistory).unshift(newVal)
    // localStorage 存储数组 ： JSON.stringify([])
    window.localStorage.setItem(
      'musicHistorySearch',
      JSON.stringify((<any>state).searchHistory)
    )
  },
  removeHistorySearch(state: IState) {
    state.searchHistory = []
    window.localStorage.setItem('musicHistorySearch', JSON.stringify([]))
  },
  changeloginAccount(state: IState, newVal: string) {
    state.loginAccount = newVal
    window.sessionStorage.setItem('loginAccount', state.loginAccount)
  },
  emailLogin(state: IState, newVal: object) {
    state.account = newVal
    window.localStorage.setItem('account', JSON.stringify(state.account))
  },
  phoneLogin(state: IState, newVal: object) {
    state.account = newVal
    window.localStorage.setItem('account', JSON.stringify((<any>newVal)))
  },
  addPlaylist(state: IState, newVal: object[]) {
    state.playList = newVal
    window.localStorage.setItem('playlist', JSON.stringify(newVal))
  },
  // 单曲插入到歌单列表
  insertPlaylist(state: IState, newVal: object) {
    (state.playList as []).splice(state.currentPlayIndex + 1, 0, (<never>newVal))
    window.localStorage.setItem('playlist', JSON.stringify(state.playList))
  },
  changePlaylist(state: IState, newVal: object[]) {
    state.playList = newVal
    window.localStorage.setItem('playlist', JSON.stringify(newVal))
  },
  // 单曲添加
  addSingle(state: IState, newVal: object) {
    (state.playList as object[]).unshift(newVal);
    window.localStorage.setItem('playlist', JSON.stringify(state.playList));
    (this as any).dispatch('changeCurrentPlayIndex', 0)
  },
  firstChangePlayIndex(state: IState, newVal: number) {
    state.currentPlayIndex = newVal
    window.localStorage.setItem('playIndex', JSON.stringify(newVal))
  },
  changePlayIndex(state: IState, newVal: number) {
    state.currentPlayIndex = newVal
    window.localStorage.setItem('playIndex', JSON.stringify(newVal))
  },
  changePlayMode(state: IState, newVal: EPlayMode) {
    state.playMode = newVal
    window.localStorage.setItem('mode', JSON.stringify(newVal))
  },
  // 删除所有歌曲列表
  removeAll(state: IState) {
    state.playList = []
    window.localStorage.setItem('playlist', JSON.stringify([]))
    mutations.changePlayIndex(state, -1)
  },
  removeCurrent(state: IState, newVal: number) {
    (state.playList as object[]).splice(newVal, 1)
    window.localStorage.setItem('playlist', JSON.stringify(state.playList))
    // 当删除的索引值 小于 当前播放的索引值时 需要对当前的索引值 -1
    if (newVal < state.currentPlayIndex) {
      mutations.changePlayIndex(state, state.currentPlayIndex - 1)
    }
    // 当删除的索引值 等于 当前播放的索引值 并且 是最后一个时， 需要对当前的索引值设为 0
    // 这里的length 不用减1  是因为 上面splice时已经去掉了一个元素
    if (newVal === state.currentPlayIndex && newVal === (state.playList as object[]).length) {
      mutations.changePlayIndex(state, 0)
    }
  },

  /** 播放历史 */
  clearPlayHistory(state: IState) {
    state.playHistory = []
    window.localStorage.setItem('playHistory', JSON.stringify([]))
  },
  removeCurrentPlayHistory(state: IState, newVal: number) {
    (state.playHistory as []).splice(newVal, 1)
    window.localStorage.setItem('playHistory', JSON.stringify(state.playHistory))
  },
  unshiftPlayHistory(state: IState, newVal: object) {
    (state.playHistory as any).unshift(newVal)
    window.localStorage.setItem('playHistory', JSON.stringify(state.playHistory))
  },
  splicePlayHistory(state: IState, newVal: object) {
    (state.playHistory as []).splice((<[]>state.playHistory).length - 1, 1)
    mutations.unshiftPlayHistory(state, newVal)
  }

}
