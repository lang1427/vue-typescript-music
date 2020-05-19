import { IState } from './interface'
export default {
    encodeLoginAccount(state: IState) {
        return (<string>state.loginAccount).replace((<string>state.loginAccount).substr(3, 4), '****')
    },
    playListLength(state: IState) {
        return (<object[]>state.playList).length
    },
    // state.currentPlayIndex = -1 bug?  state获取localstorage时需要使用三目运算符而是逻辑或 
    // 这里的防错处理的比较多  播放列表发生改变时，如果播放索引大于播放列表时的需要做防止找不到id，name，img的处理
    playMusicID(state: IState) {
        return state.currentPlayIndex != -1 ? (state.currentPlayIndex < (<object[]>state.playList).length ? (<any>state).playList[state.currentPlayIndex].id : -1) : -1
    },
    playMusicName(state: IState) {
        return state.currentPlayIndex != -1 ? (state.currentPlayIndex < (<object[]>state.playList).length ? (<any>state).playList[state.currentPlayIndex].name : '') : ''
    },
    playMusicImg(state: IState) {
        return state.currentPlayIndex != -1 ? (state.currentPlayIndex < (<object[]>state.playList).length ? (<any>state).playList[state.currentPlayIndex].imgURL : '') : ''
    },
    playHistoryLength(state:IState){
        return (state.playHistory as object[]).length
    }
}