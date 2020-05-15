<template>
  <div class="edit-song-tags">
    <div class="head">
      <span class="fa-arrow-left ico" @click="back"></span>
      <span class="title">选择标签</span>
      <span class="save" @click="save">保存</span>
    </div>
    <div class="tip">{{ tipMes }}</div>
    <div class="body" ref="tagsBody">
      <div class="table-box language">
        <table>
          <tbody>
            <tr>
              <td class="key" rowspan="2">
                <p>
                  <img class="ico" src="./image/language.svg" alt />
                </p>
                <p class="text">语言</p>
              </td>
              <td @click="isCheck" :class="songTags.includes('华语')?'tags-active':''">华语</td>
              <td @click="isCheck" :class="songTags.includes('欧美')?'tags-active':''">欧美</td>
              <td @click="isCheck" :class="songTags.includes('日语')?'tags-active':''">日语</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('韩语')?'tags-active':''">韩语</td>
              <td @click="isCheck" :class="songTags.includes('粤语')?'tags-active':''">粤语</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-box style">
        <table>
          <tbody>
            <tr>
              <td class="key" rowspan="2">
                <p>
                  <img class="ico" src="./image/style.svg" alt />
                </p>
                <p class="text">风格</p>
              </td>
              <td @click="isCheck" :class="songTags.includes('流行')?'tags-active':''">流行</td>
              <td @click="isCheck" :class="songTags.includes('摇滚')?'tags-active':''">摇滚</td>
              <td @click="isCheck" :class="songTags.includes('民谣')?'tags-active':''">民谣</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('电子')?'tags-active':''">电子</td>
              <td @click="isCheck" :class="songTags.includes('舞曲')?'tags-active':''">舞曲</td>
              <td @click="isCheck" :class="songTags.includes('说唱')?'tags-active':''">说唱</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('轻音乐')?'tags-active':''">轻音乐</td>
              <td @click="isCheck" :class="songTags.includes('爵士')?'tags-active':''">爵士</td>
              <td @click="isCheck" :class="songTags.includes('乡村')?'tags-active':''">乡村</td>
              <td @click="isCheck" :class="songTags.includes('R&B/Soul')?'tags-active':''">R&B/Soul</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('古典')?'tags-active':''">古典</td>
              <td @click="isCheck" :class="songTags.includes('民族')?'tags-active':''">民族</td>
              <td @click="isCheck" :class="songTags.includes('英伦')?'tags-active':''">英伦</td>
              <td @click="isCheck" :class="songTags.includes('金属')?'tags-active':''">金属</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('朋克')?'tags-active':''">朋克</td>
              <td @click="isCheck" :class="songTags.includes('蓝调')?'tags-active':''">蓝调</td>
              <td @click="isCheck" :class="songTags.includes('雷鬼')?'tags-active':''">雷鬼</td>
              <td @click="isCheck" :class="songTags.includes('世界音乐')?'tags-active':''">世界音乐</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('拉丁')?'tags-active':''">拉丁</td>
              <td @click="isCheck" :class="songTags.includes('New Age')?'tags-active':''">New Age</td>
              <td @click="isCheck" :class="songTags.includes('古风')?'tags-active':''">古风</td>
              <td @click="isCheck" :class="songTags.includes('后摇')?'tags-active':''">后摇</td>
            </tr>
            <tr>
              <td
                @click="isCheck"
                :class="songTags.includes('Bossa Nova')?'tags-active':''"
              >Bossa Nova</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-box scene">
        <table>
          <tbody>
            <tr>
              <td class="key" rowspan="2">
                <p>
                  <img class="ico" src="./image/scene.svg" alt />
                </p>
                <p class="text">场景</p>
              </td>
              <td @click="isCheck" :class="songTags.includes('清晨')?'tags-active':''">清晨</td>
              <td @click="isCheck" :class="songTags.includes('夜晚')?'tags-active':''">夜晚</td>
              <td @click="isCheck" :class="songTags.includes('学习')?'tags-active':''">学习</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('工作')?'tags-active':''">工作</td>
              <td @click="isCheck" :class="songTags.includes('午休')?'tags-active':''">午休</td>
              <td @click="isCheck" :class="songTags.includes('下午茶')?'tags-active':''">下午茶</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('驾车')?'tags-active':''">驾车</td>
              <td @click="isCheck" :class="songTags.includes('运动')?'tags-active':''">运动</td>
              <td @click="isCheck" :class="songTags.includes('旅行')?'tags-active':''">旅行</td>
              <td @click="isCheck" :class="songTags.includes('散步')?'tags-active':''">散步</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('酒吧')?'tags-active':''">酒吧</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-box emotion">
        <table>
          <tbody>
            <tr>
              <td class="key" rowspan="2">
                <p>
                  <img class="ico" src="./image/emotion.svg" alt />
                </p>
                <p class="text">情感</p>
              </td>
              <td @click="isCheck" :class="songTags.includes('怀旧')?'tags-active':''">怀旧</td>
              <td @click="isCheck" :class="songTags.includes('清新')?'tags-active':''">清新</td>
              <td @click="isCheck" :class="songTags.includes('浪漫')?'tags-active':''">浪漫</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('伤感')?'tags-active':''">伤感</td>
              <td @click="isCheck" :class="songTags.includes('治愈')?'tags-active':''">治愈</td>
              <td @click="isCheck" :class="songTags.includes('放松')?'tags-active':''">放松</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('孤独')?'tags-active':''">孤独</td>
              <td @click="isCheck" :class="songTags.includes('感动')?'tags-active':''">感动</td>
              <td @click="isCheck" :class="songTags.includes('兴奋')?'tags-active':''">兴奋</td>
              <td @click="isCheck" :class="songTags.includes('快乐')?'tags-active':''">快乐</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('安静')?'tags-active':''">安静</td>
              <td @click="isCheck" :class="songTags.includes('思念')?'tags-active':''">思念</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="table-box theme">
        <table>
          <tbody>
            <tr>
              <td class="key" rowspan="2">
                <p>
                  <img class="ico" src="./image/theme.svg" alt />
                </p>
                <p class="text">主题</p>
              </td>
              <td @click="isCheck" :class="songTags.includes('综艺')?'tags-active':''">综艺</td>
              <td @click="isCheck" :class="songTags.includes('影视原声')?'tags-active':''">影视原声</td>
              <td @click="isCheck" :class="songTags.includes('ACG')?'tags-active':''">ACG</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('儿童')?'tags-active':''">儿童</td>
              <td @click="isCheck" :class="songTags.includes('校园')? 'tags-active':''">校园</td>
              <td @click="isCheck" :class="songTags.includes('游戏')?'tags-active':''">游戏</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('70后')?'tags-active':''">70后</td>
              <td @click="isCheck" :class="songTags.includes('80后')?'tags-active':''">80后</td>
              <td @click="isCheck" :class="songTags.includes('90后')?'tags-active':''">90后</td>
              <td @click="isCheck" :class="songTags.includes('网络歌曲')?'tags-active':''">网络歌曲</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('KTV')?'tags-active':''">KTV</td>
              <td @click="isCheck" :class="songTags.includes('经典')?'tags-active':''">经典</td>
              <td @click="isCheck" :class="songTags.includes('翻唱')?'tags-active':''">翻唱</td>
              <td @click="isCheck" :class="songTags.includes('吉他')?'tags-active':''">吉他</td>
            </tr>
            <tr>
              <td @click="isCheck" :class="songTags.includes('钢琴')?'tags-active':''">钢琴</td>
              <td @click="isCheck" :class="songTags.includes('器乐')?'tags-active':''">器乐</td>
              <td @click="isCheck" :class="songTags.includes('榜单')?'tags-active':''">榜单</td>
              <td @click="isCheck" :class="songTags.includes('00后')?'tags-active':''">00后</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { htmlDecode } from "@/utils/html";
import { updateSongTags } from "@/service/songsheet";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class EditSongTags extends Vue {
  private songTags: string | (string | null)[] = "";
  private checkCount: number = 0;
  get id() {
    return parseInt(<string>this.$route.query.songid);
  }
  get tipMes() {
    return `请选择合适的标签，最多选择3个，已选${this.checkCount}个`;
  }

  created() {
    this.songTags = this.$route.query.tags;
  }
  mounted() {
    this.setCheckCount();
  }
  async setUpdateSongTags() {
    let tagsList = (<HTMLElement>this.$refs.tagsBody).querySelectorAll(
      ".tags-active"
    );
    let tags: any = [];
    tagsList.forEach(item => {
      tags.push(htmlDecode(item.innerHTML));
    });
    tags = tags.join(";");
    let res = await updateSongTags(this.id, tags);
    if (res.code === 200) {
      this.$toast("修改成功");
      this.$router.replace({
        query: { ...this.$route.query, tags }
      });
    }
  }
  setCheckCount() {
    let tagsList = (<HTMLElement>this.$refs.tagsBody).querySelectorAll(
      ".tags-active"
    );
    this.checkCount = tagsList.length;
  }
  back() {
    this.$router.back();
  }
  /**
   * 点击标签时，首先需要判断当前点击的标签是否已选中，如果选中，则取消选中，
   * 如果没有选中，则需要再次判断是否已超过3个标签的量，如果超过 则提醒 并 return
   * 没有超过 则加入到选中标签中
   */
  isCheck(e: any) {
    if (e.target.classList.contains("tags-active")) {
      // ☆ 这里需要同时对 songTags数据进行改变 和 移除类样式  ☆             '另外需要注意的是：值可能会被转义，需要反转一下htmlDecode'
      // 数据改变是为了 动态绑定的类样式移除
      // 而单单是数据改变 并不能立即将类样式移除 这里直接获取的 tags-active 仍然是之前的 ,so  必须手动移除
      this.songTags = (this.songTags as string).replace(
        htmlDecode(e.target.innerHTML),
        ""
      );
      e.target.classList.remove("tags-active");
    } else {
      if (this.checkCount >= 3) {
        this.$toast("最多选择3个");
        return false;
      }
      this.songTags = (this.songTags as string).replace(
        "",
        htmlDecode(e.target.innerHTML)
      );
      e.target.classList.add("tags-active");
    }

    this.setCheckCount();
  }

  save() {
    this.setUpdateSongTags();
  }
}
</script>
<style scoped lang='less'>
.edit-song-tags {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: whitesmoke;
  .head {
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    height: 50px;
    align-items: center;
    // z-index: 10101;
    background: whitesmoke;
    .ico {
      width: 50px;
      text-align: center;
      font-size: 18px;
    }
    .title {
      flex: 1;
    }
    .save {
      width: 50px;
      text-align: center;
      font-size: 12px;
      color: #666;
    }
  }
  .tip {
    padding-left: 10px;
    font-size: 12px;
    margin-top: 55px;
    color: #999;
  }
  .body {
    background-color: whitesmoke;
    .table-box {
      padding-top: 10px;
      table {
        width: 100%;
        tbody {
          tr {
            border-top: 1px solid #ccc;
            &:first-child {
              border-top: none;
            }
            td {
              height: 30px;
              line-height: 30px;
              width: 25%;
              text-align: center;
              border-left: 1px solid #ccc;
              &.tags-active {
                background-color: @klColor;
                color: white;
              }
              &:first-child {
                border-left: none;
              }
              &.key {
                .ico {
                  width: 22px;
                  vertical-align: middle;
                }
                .text {
                  color: #666;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>