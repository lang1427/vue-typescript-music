import { IState } from './interface'
export const mutations = {
  changeSearchKey(state: IState, newVal: string) {
    state.searchKeyWrold = newVal
    window.sessionStorage.setItem('searchKeyWrold', newVal)
  },
  addHistorySearch(state: IState, newVal: string) {
    ;(<string[]>state.searchHistory).unshift(newVal)
    // localStorage 存储数组 ： JSON.stringify([])
    window.localStorage.setItem(
      'musicHistorySearch',
      JSON.stringify((<any>state).searchHistory)
    )
  },
  removeHistorySearch(state: IState) {
    state.searchHistory = []
    window.localStorage.setItem('musicHistorySearch', JSON.stringify([]))
  }
}
