import {IState} from './interface'
export const getters={
     encodeLoginAccount(state:IState){
        return (<string>state.loginAccount).replace((<string>state.loginAccount).substr(3,4),'****')
    }
}