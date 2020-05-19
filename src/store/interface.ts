export interface IState {
  loadingShow: boolean
  searchKeyWrold: string | null
  searchHistory: string | never[] | null
  loginAccount: string | null
  account: object
  playList: object[] | null
  currentPlayIndex: number
  playMode: EPlayMode
  playHistory: object[] | null
}
// 定义播放的类型
export enum EPlayMode {
  listLoop, // 0列表循环
  singleLoop, // 1单曲循环
  random  // 2随机播放
}