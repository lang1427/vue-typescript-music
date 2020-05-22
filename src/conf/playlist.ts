interface IPlaylist {
    id: number
    name: string
    imgURL: string
}
export interface ISongs {
    id: number
    name: string
    al: {
        picUrl: string
    }
    album: {
        artist: {
            img1v1Url: string
        }
    }
}
// 播放列表容器的类
export class PlayList implements IPlaylist {
    id: number
    name: string
    imgURL: string
    constructor(songs: ISongs) {
        this.id = songs.id
        this.name = songs.name
        this.imgURL = songs.al && songs.al.picUrl || songs.album.artist.img1v1Url
    }
}

// 当有播放列表时，需要设置一个marginBottom，没有播放列表时去除marginBottom
export function playerSetMarginBottom() {
    (<any>document.querySelector('#app')).children[1] ? (<any>document.querySelector('#app')).children[1].style.marginBottom = '50px' : false
}
export function playerRemoveMarginBottom() {
    (<any>document.querySelector('#app')).children[1] ? (<any>document.querySelector('#app')).children[1].style.marginBottom = '0px' : false
}