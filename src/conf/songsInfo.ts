export interface ISonginfo {
  id: number;
  song_name: string;
  cover_url: string;
  introduction:string;
}

export class SongsInfoClass {
  songsId: number;
  songsName: string;
  imgUrl: string;
  introduction: string;
  constructor(songsInfo: ISonginfo) {
    this.songsId = songsInfo.id;
    this.songsName = songsInfo.song_name;
    this.imgUrl = songsInfo.cover_url;
    this.introduction = songsInfo.introduction;
  }
}
