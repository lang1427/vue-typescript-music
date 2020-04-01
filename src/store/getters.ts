import { IState } from './interface'
export default {
    encodeLoginAccount(state: IState) {
        return (<string>state.loginAccount).replace((<string>state.loginAccount).substr(3, 4), '****')
    },
    playListLength(state: IState) {
        return (<object[]>state.playList).length
    },
    playMusicID(state: IState) {
        return (<object[]>state.playList).length != 0 && (<any>state).playList[state.currentPlayIndex].id || -1
    },
    playMusicName(state: IState) {
        return (<object[]>state.playList).length != 0 && (<any>state).playList[state.currentPlayIndex].name || ''
    },
    playMusicImg(state: IState) {
        return (<object[]>state.playList).length != 0 && (<any>state).playList[state.currentPlayIndex].imgURL || ''
    }
}