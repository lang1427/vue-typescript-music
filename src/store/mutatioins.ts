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
  }
}
