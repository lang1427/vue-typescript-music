import { IState } from './interface'
export default {
    encodeLoginAccount(state: IState) {
        return (<string>state.loginAccount).replace((<string>state.loginAccount).substr(3, 4), '****')
    },
    playListLength(state: IState) {
        return (<object[]>state.playList).length
    }
}