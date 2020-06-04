import { service } from './service'

// 音乐是否可用
export function isCanMusic(id: number) {
    return service({
        url: '/check/music',
        params: {
            id
        }
    })
}

// 获取音乐url
export function musicUrl(id: number) {
    return service({
        url: '/song/url',
        params: {
            id
        }
    })
}

// 获取音乐歌词
export function musicLyric(id: number) {
    return service({
        url: 'lyric',
        params: {
            id
        }
    })
}  