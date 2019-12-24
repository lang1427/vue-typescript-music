export const actions = {
  addHistorySearchArr(context: any, newVal: string) {
    let arr = context.state.searchHistory.find((item: string) => {
      console.log(item)
      item === newVal
    })
    if (arr) {
      return
    } else {
      context.commit('addHistorySearch', newVal)
    }
  }
}
