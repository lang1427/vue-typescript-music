import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state: IState = {
  loadingShow: false,
  searchKeyWrold: window.sessionStorage.getItem('searchKeyWrold')
    ? window.sessionStorage.getItem('searchKeyWrold')
    : '',
  searchHistory: JSON.parse(
    window.localStorage.getItem('musicHistorySearch') || '[]'
  ),
  loginAccount: window.sessionStorage.getItem('loginAccount') ? window.sessionStorage.getItem('loginAccount') : '',
  account: JSON.parse((<any>window.localStorage).getItem('account')) || {},
  playList: JSON.parse(window.localStorage.getItem('playlist') || '[]'),  // 播放列表中的容器
  currentPlayIndex: (<any>window.localStorage).getItem('playIndex') ? parseInt((<any>window.localStorage).getItem('playIndex')) : -1,
  // currentPlayIndex: parseInt((<any>window.localStorage).getItem('playIndex')) || -1, // 当前播放容器的索引值
  playMode: parseInt((<any>window.localStorage).getItem('mode')) || EPlayMode.listLoop,
  playHistory: JSON.parse(window.localStorage.getItem('playHistory') || '[]')
}
import { IState, EPlayMode } from './interface'
import { mutations } from './mutatioins'
import { actions } from './actions'
import getters from './getters'
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
