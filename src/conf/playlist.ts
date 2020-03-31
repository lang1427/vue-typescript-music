interface IPlaylist {
    id: number
    name: string
    imgURL: string
}
interface ISongs {
    id: number
    name: string
    al: {
        picUrl: string
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
        this.imgURL = songs.al.picUrl
    }
}