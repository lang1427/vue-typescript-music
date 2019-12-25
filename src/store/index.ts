import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state: IState = {
  searchKeyWrold: window.sessionStorage.getItem('searchKeyWrold')
    ? window.sessionStorage.getItem('searchKeyWrold')
    : '',
  searchHistory: JSON.parse(
    window.localStorage.getItem('musicHistorySearch') || '[]'
  )
}
import { IState } from './interface'
import { mutations } from './mutatioins'
import { actions } from './actions'
export default new Vuex.Store({
  state,
  mutations,
  actions
})
