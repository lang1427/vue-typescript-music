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
  loginMode(context: any, newVal: object) {
    let router = window.location.href
    if (router.match(/\/login\/email/)) {
      context.commit('emailLogin', newVal)
    } else {
      context.commit('phoneLogin', newVal)
    }
  },
  // 加入音乐播放列表队列中
  changePlayList(context: any, newVal: object[]) {
    if (context.state.playList.length === 0) {
      context.commit('addPlaylist', newVal)
    } else {
      // if(context.state.playList.toString() == newVal.toString()) return false  // 与当前列表一致的话则不做commit
      context.commit('changePlaylist', newVal)
    }
  },
  changeCurrentPlayIndex(context:any,newVal:number){
    if(context.state.currentPlayIndex === -1){
      context.commit('firstChangePlayIndex',newVal)
    }else{
      context.commit('changePlayIndex',newVal)
    }
  }
}
