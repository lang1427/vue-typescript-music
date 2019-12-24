import { IState } from './interface'
export const mutations = {
  changeSearchKey(state: IState, newVal: string) {
    state.searchKeyWrold = newVal
    window.sessionStorage.setItem('searchKeyWrold', newVal)
  },
  addHistorySearch(state: IState, newVal: string) {
    ;(<string[]>state.searchHistory).push(newVal)
    let arr: any = (<string[]>state.searchHistory).push(newVal)
    console.log(arr)
    window.localStorage.setItem('searchHistory', arr)
  }
}
