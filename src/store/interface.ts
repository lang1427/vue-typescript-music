export interface IState {
  searchKeyWrold: string | null
  searchHistory: string | never[] | null
  loginAccount: string | null
  account: object
  playList: object[] | null
  currentPlayIndex: number
  playMode: EPlayMode
}
// 定义播放的类型
export enum EPlayMode {
  listLoop, // 0列表循环
  singleLoop, // 1单曲循环
  random  // 2随机播放
}