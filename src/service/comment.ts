/** 评论 Api接口  */

import { service } from './service'
export interface IComment {
    user: {
        userId: number
        nickname: string
        avatarUrl: string
    }
    commentId: number
    content: string
    time: number
    liked: boolean
    likedCount: number
    parentCommentId: number
    beReplied: [
        {
            user: {
                userId: number
                nickname: string
                avatarUrl: string
            }
            content: string
        }
    ]
}
export class CommentClass {

    private userId: number
    private userName: string
    private userAvatar: string

    private commentId: number
    private commentContent: string
    private commentTime: number
    private commentLiked: boolean
    private commentLikedCount: number

    private parentCommentId: number

    private replyUserId: number
    private replyUserName: string
    private replyUserAvatar: string
    private replyContent: string

    constructor(commentObj: IComment) {

        this.userId = commentObj.user.userId
        this.userName = commentObj.user.nickname
        this.userAvatar = commentObj.user.avatarUrl

        this.commentId = commentObj.commentId
        this.commentContent = commentObj.content
        this.commentTime = commentObj.time
        this.commentLiked = commentObj.liked
        this.commentLikedCount = commentObj.likedCount

        this.parentCommentId = commentObj.parentCommentId || 0 // 发表评论时需要默认值，否则undefined 为回复评论的数据了

        this.replyUserId = commentObj.beReplied && commentObj.beReplied[0] && commentObj.beReplied[0].user.userId
        this.replyUserName = commentObj.beReplied && commentObj.beReplied[0] && commentObj.beReplied[0].user.nickname
        this.replyUserAvatar = commentObj.beReplied && commentObj.beReplied[0] && commentObj.beReplied[0].user.avatarUrl
        this.replyContent = commentObj.beReplied && commentObj.beReplied[0] && commentObj.beReplied[0].content
    }
}

// 歌单评论 (歌单id，偏移数量：page*limit，limit：数量)
export function songSheetComment(id: number, offset?: number, limit: number = 20) {
    return service({
        url: 'comment/playlist?timestamp=' + Date.now(),
        params: {
            id,
            offset: offset ? (<number>offset) * limit : null,
            limit
        }
    })
}

// 专辑评论 同上
export function albumComment(id: number, offset?: number, limit: number = 20) {
    return service({
        url: 'comment/album?timestamp=' + Date.now(),
        params: {
            id,
            offset: offset ? (<number>offset) * limit : null,
            limit
        }
    })
}

// 歌曲评论 同上
export function songsComment(id: number, offset?: number, limit: number = 20) {
    return service({
        url: 'comment/music?timestamp=' + Date.now(),
        params: {
            id,
            offset: offset ? (<number>offset) * limit : null,
            limit
        }
    })
}



/** 给评论点赞
 *  
 * @param id  资源id（专辑、歌单、歌曲 等）
 * @param cid 评论id
 * @param t 是否点赞 （1：点赞; 0：取消点赞）
 * @param type 资源类型 0:歌曲  1:mv  2:歌单  3:专辑  4:电台  5:视频  6:动态
 */
export function likeComment(id: number, cid: number, t: number, type: number) {
    return service({
        url: 'comment/like?timestamp=' + Date.now(),
        params: {
            id,
            cid,
            t,
            type
        }
    })
}


/**  发表、回复/删除 评论
 * 
 * @param operationType // 操作类型  0：删除   1：发送    2：回复
 * @param commentType  // 评论类型 0:歌曲  1:mv  2:歌单  3:专辑  4:电台  5:视频  6:动态
 * @param typeID // 评论类型对应的id
 * @param content // 评论内容 
 * @param commentId  // 回复的评论id 或 内容ID(删除)
 */
export function operationComment(operationType: number, commentType: number, typeID: number, content: string, commentId?: number) {
    return service({
        url: '/comment',
        params: {
            t: operationType,
            type: commentType,
            id: typeID,
            content,
            commentId
        }
    })
}
