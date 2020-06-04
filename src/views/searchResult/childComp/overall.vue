<template>
  <div>
    <scroll
      ref="overallScroll"
      class="overall-scroll"
      :freeScroll="true"
      v-if="Object.keys(overallList).length != 0"
    >
      <div class="overall">
        <div class="single" v-if="overallList.song">
          <div class="head">
            <h3 class="title">单曲</h3>
            <!-- <span class="play-more">播放全部</span> -->
          </div>
          <div class="body">
            <div
              class="list-items"
              v-for="item of Songs"
              :key="item.songsId"
              @click="playSingle(item)"
            >
              <div class="info">
                <p class="single-name">{{ item.songsName }}</p>
                <p class="info-name">{{ item.singerName }}</p>
              </div>
            </div>
          </div>
          <div class="bottom" v-if="overallList.song.more" @click="goMarryView(1)">
            {{ overallList.song.moreText }}
            <i class="fa-angle-right"></i>
          </div>
        </div>
        <div class="video" v-if="overallList.video">
          <div class="head">
            <h3 class="title">视频</h3>
          </div>
          <div class="body">
            <div class="list-items" v-for="item of overallList.video.videos" :key="item.vid">
              <div class="items-img">
                <img v-lazy="item.coverUrl" @load="imgLoad" />
              </div>
              <div class="info">
                <p>{{ item.title }}</p>
                <p class="desc">
                  {{ item.durationms | newTime }} by
                  {{ item.creator[0].userName }}
                </p>
              </div>
            </div>
          </div>
          <div class="bottom" v-if="overallList.video.more" @click="goMarryView(2)">
            {{ overallList.video.moreText }}
            <i class="fa-angle-right"></i>
          </div>
        </div>
        <div class="artist" v-if="overallList.artist">
          <div class="head">
            <h3 class="title">歌手</h3>
          </div>
          <div class="body">
            <div
              class="list-items"
              v-for="item of overallList.artist.artists"
              :key="item.id"
              @click="goSingerDetail(item.id)"
            >
              <div class="items-img">
                <img v-lazy="item.picUrl" @load="imgLoad" />
              </div>
              <div class="name">{{ item.name }}</div>
              <div class="settled-in">
                <span class="fa-user-circle"></span>已入驻
              </div>
            </div>
          </div>
          <div class="bottom" v-if="overallList.artist.more" @click="goMarryView(3)">
            {{ overallList.artist.moreText }}
            <i class="fa-angle-right"></i>
          </div>
        </div>
        <div class="album" v-if="overallList.album">
          <div class="head">
            <h3 class="title">专辑</h3>
          </div>
          <div class="body">
            <div
              class="list-items"
              v-for="item of overallList.album.albums"
              :key="item.id"
              @click="goAlbum(item.id)"
            >
              <div class="items-img">
                <img v-lazy="item.picUrl" @load="imgLoad" />
              </div>
              <div class="info">
                <p>{{ item.name }}</p>
                <p class="desc">{{ item.artist.name }} {{ item.publishTime | ymd }}</p>
              </div>
            </div>
          </div>
          <div class="bottom" v-if="overallList.album.more" @click="goMarryView(4)">
            {{ overallList.album.moreText }}
            <i class="fa-angle-right"></i>
          </div>
        </div>
        <div class="song-sheet" v-if="overallList.playList">
          <div class="head">
            <h3 class="title">歌单</h3>
          </div>
          <div class="body">
            <div
              class="list-items"
              v-for="item of overallList.playList.playLists"
              :key="item.id"
              @click="goSongsheet(item.id)"
            >
              <div class="items-img">
                <img v-lazy="item.coverImgUrl" @load="imgLoad" />
              </div>
              <div class="info">
                <p>{{ item.name }}</p>
                <p class="desc">
                  {{ item.trackCount }}首 by {{ item.creator.nickname }} 播放{{
                  item.playCount | finalPlayCount
                  }}次
                </p>
              </div>
            </div>
          </div>
          <div class="bottom" v-if="overallList.playList.more" @click="goMarryView(5)">
            {{ overallList.playList.moreText }}
            <i class="fa-angle-right"></i>
          </div>
        </div>
        <div class="djRadio" v-if="overallList.djRadio">
          <div class="head">
            <h3 class="title">电台</h3>
          </div>
          <div class="body">
            <div class="list-items" v-for="item of overallList.djRadio.djRadios" :key="item.id">
              <div class="items-img">
                <img v-lazy="item.picUrl" @load="imgLoad" />
              </div>
              <div class="info">
                <p>{{ item.name }}</p>
                <p class="desc">{{ item.dj.nickname }}</p>
              </div>
            </div>
          </div>
          <div class="bottom" v-if="overallList.djRadio.more" @click="goMarryView(6)">
            {{ overallList.djRadio.moreText }}
            <i class="fa-angle-right"></i>
          </div>
        </div>
        <div class="user" v-if="overallList.user">
          <div class="head">
            <h3 class="title">用户</h3>
          </div>
          <div class="body">
            <div class="list-items" v-for="item of overallList.user.users" :key="item.id">
              <div class="items-img">
                <img v-lazy="item.avatarUrl" @load="imgLoad" />
              </div>
              <div class="info">
                <p>{{ item.nickname }}</p>
                <p class="desc">{{ item.signature }}</p>
              </div>
              <div class="follow">+关注</div>
            </div>
          </div>
          <div class="bottom" v-if="overallList.user.more" @click="goMarryView(7)">
            {{ overallList.user.moreText }}
            <i class="fa-angle-right"></i>
          </div>
        </div>
      </div>
    </scroll>
    <loading v-show="$store.state.loadingShow" />
  </div>
</template>

<script lang="ts">
interface IOverallList{
  song:{
    songs:[]
  }
}
import scroll from "components/common/scroll/scroll.vue";
import { formatDate } from "@/utils/formatDate";
import { debounce } from "@/utils/debounce.js";
import { SongsInfoClass } from "@/conf/songsInfo";
import { loadingMixin, singlePlayMixin } from "@/utils/mixin";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    scroll
  },
  mixins: [loadingMixin, singlePlayMixin],
  filters: {
    newTime(durationms: number) {
      let data = new Date(durationms);
      return formatDate(data, "mm:ss");
    },
    ymd(date: Date) {
      let newDate = new Date(date);
      return formatDate(newDate, "yyyy.M.d");
    }
  }
})
export default class OverAll extends Vue {
  @Prop({
    default() {
      return {};
    }
  })
  overallList!: IOverallList;
  imgLoad() {
    // 解决 refresh() of  undefined 的问题
    this.$refs.overallScroll && (this.$refs.overallScroll as any).refresh();
  }

  get Songs(){
    let arr = (<IOverallList>this.overallList).song.songs
    let songs = []
    for (const item of arr) {
      songs.push(new SongsInfoClass(item))
    }
    return songs
  }

  goSingerDetail(id: number) {
    this.$router.push("/singer/detail/" + id);
  }
  goAlbum(id: number) {
    this.$router.push("/album/" + id);
  }
  goSongsheet(id: number) {
    this.$router.push("/songsheet/" + id);
  }

  goMarryView(index: number) {
    (<any>this).$bus.$emit("goMarryView", index);
  }
}
</script>

<style lang="less" scoped>
.overall-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 0px;
  overflow: hidden;
  .overall {
    padding: 0 10px;
    h3.title {
      font-size: 16px;
    }
    .bottom {
      text-align: center;
      padding: 5px 0;
      color: #666;
    }
    .single {
      padding-top: 15px;
      .head {
        display: flex;
        .title {
          flex: 1;
        }
        .play-more {
          border-radius: 12px;
          border: 1px solid #ccc;
          padding: 4px;
          font-size: 12px;
        }
      }
      .body {
        .list-items {
          display: flex;
          padding: 3px 0;
          .info {
            flex: 1;
            overflow: hidden;
            .single-name {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .info-name {
              font-size: 12px;
              color: #999;
            }
          }
          // .operation {
          //   width: 60px;
          // }
        }
      }
    }
    .song-sheet,
    .video,
    .artist,
    .album,
    .djRadio,
    .user {
      .head {
        margin: 15px 0 5px;
      }
      .list-items {
        display: flex;
        align-items: center;
        text-align: left;
        padding: 5px 0;
        .items-img {
          width: 80px;
          img {
            width: 100%;
            display: block;
          }
        }
        .info {
          flex: 1;
          margin-left: 15px;
          .desc {
            font-size: 12px;
            color: #999;
          }
        }
      }
    }
    .artist {
      .items-img {
        width: 60px !important;
        height: 60px;
        img {
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        flex: 1;
        padding-left: 15px;
      }
      .settled-in {
        width: 60px;
        font-size: 12px;
        color: #999;
        span {
          color: @klColor;
          margin-right: 3px;
        }
      }
    }
    .user {
      .items-img {
        width: 60px !important;
        height: 60px;
        img {
          height: 100%;
          border-radius: 50%;
        }
      }
      .info {
        flex: 1;
      }
      .follow {
        // width: 60px;
        color: @klColor;
        border: 1px solid @klColor;
        border-radius: 12px 5px;
        padding: 4px;
      }
    }
  }
}
</style>
