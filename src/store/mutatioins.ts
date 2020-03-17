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
  },
  changeloginAccount(state:IState,newVal:string){
    state.loginAccount = newVal
    window.sessionStorage.setItem('loginAccount',state.loginAccount)
  },
  emailLogin(state:IState,newVal:object){
    state.account = newVal
    window.localStorage.setItem('account',JSON.stringify(state.account))
  },
  phoneLogin(state:IState,newVal:object){
    state.account = newVal
    window.localStorage.setItem('account',JSON.stringify((<any>newVal)))
  }
}
