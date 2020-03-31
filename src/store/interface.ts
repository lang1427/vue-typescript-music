export interface IState {
  searchKeyWrold: string | null
  searchHistory: string | never[] | null
  loginAccount: string | null
  account: object
  playList: object[] | null
  currentPlayIndex: number
}