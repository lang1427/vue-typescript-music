import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state: IState = {
  searchKeyWrold: window.sessionStorage.getItem('searchKeyWrold')
    ? window.sessionStorage.getItem('searchKeyWrold')
    : '',
  searchHistory: JSON.parse(
    window.localStorage.getItem('musicHistorySearch') || '[]'
  ),
  loginAccount: window.sessionStorage.getItem('loginAccount') ? window.sessionStorage.getItem('loginAccount') : '',
  account: (<any>window.localStorage).getItem('account') || {}
}
import { IState } from './interface'
import { mutations } from './mutatioins'
import { actions } from './actions'
import { getters } from './getters'
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
