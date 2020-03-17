export const actions = {
  // 添加历史搜索记录
  addHistorySearchArr(context: any, newVal: string) {
    let arr = context.state.searchHistory.find((item: string) => {
      if (item === newVal) {
        return true
      }
    })
    if (arr) {
      return
    } else {
      context.commit('addHistorySearch', newVal)
    }
  },
  // 登录方式
  loginMode(context:any,newVal:object){
    let router = window.location.href
    if(router.match(/\/login\/email/)){
      context.commit('emailLogin',newVal)
    }else{
      context.commit('phoneLogin',newVal)
    }
  }
}
