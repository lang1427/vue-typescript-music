
export interface ISonginfo {
    id: number
    name: string
    al: {
        id: number
        picUrl: string
    }
    ar: [{ name: string }]
}

export class SongsInfoClass {
    songsId: number
    songsName: string
    albumId: number
    imgUrl: string
    singerName: string
    constructor(songsInfo: ISonginfo) {
        this.songsId = songsInfo.id
        this.songsName = songsInfo.name
        this.albumId = songsInfo.al.id
        this.imgUrl = songsInfo.al.picUrl
        let singers = []
        for (let item of songsInfo.ar) {
            singers.push(item.name)
        }
        this.singerName = songsInfo.ar.length === 1 ? songsInfo.ar[0].name : singers.join(' | ')
    }
}