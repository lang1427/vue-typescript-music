export const actions = {
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
  }
}
