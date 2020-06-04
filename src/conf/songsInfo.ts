
export interface ISonginfo {
    id: number
    name: string
    al: {
        id: number
        picUrl: string
    }
    album: {
        id: number
        artist: {
            img1v1Url: string
        }
    }
    ar: [{ name: string }]
    artists: [{ name: string }]
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
        this.albumId = songsInfo.al && songsInfo.al.id || songsInfo.album && songsInfo.album.id
        this.imgUrl = songsInfo.al && songsInfo.al.picUrl || songsInfo.album && songsInfo.album.artist.img1v1Url
        let singers: any[] = []
        if (songsInfo.ar) {
            for (let item of songsInfo.ar) {
                singers.push(item.name)
            }
        } else {
            for (let item of songsInfo.artists) {
                singers.push(item.name)
            }
        }
        this.singerName = singers.length === 1 ? singers[0] : singers.join(' | ')
    }
}