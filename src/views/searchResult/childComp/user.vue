<template>
  <div>
    <scroll class="user-scroll" ref="userScroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <div>
        <div class="user" v-if="userList.length != 0">
          <div class="list-items" v-for="(item, index) of userList" :key="index">
            <div class="items-img">
              <img v-lazy="item.avatarUrl" @load="imgLoad" />
            </div>
            <div class="info">
              <div class="name">{{ item.nickname }}</div>
              <div class="desc">{{ item.signature }}</div>
            </div>
            <div class="follower">+ 关注</div>
          </div>
        </div>
        <loading v-show="$store.state.loadingShow" />
      </div>
    </scroll>
  </div>
</template>

<script lang="ts">
import scroll from "components/common/scroll/scroll.vue";
import { loadingMixin } from "@/utils/mixin";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  components: {
    scroll
  },
  mixins: [loadingMixin]
})
export default class User extends Vue {
  @Prop({
    default() {
      return [];
    }
  })
  userList!: object[];

  mounted() {
    (<any>this).$bus.$on("finishPullUp", () => {
      this.$refs.userScroll && (<any>this.$refs.userScroll).finishPullUp();
      this.$refs.userScroll && (<any>this.$refs.userScroll).refresh();
    });
  }
  destroyed() {
    (<any>this).$bus.$off("finishPullUp");
  }

  imgLoad() {
    this.$refs.userScroll && (this.$refs.userScroll as any).refresh();
  }

  pullingUp() {
    this.$emit("pullingUp", 7);
  }
}
</script>

<style lang="less" scoped>
.user-scroll {
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 0;
  overflow: hidden;
  .user {
    padding: 10px 10px 0;
    .list-items {
      padding: 5px 0;
      display: flex;
      align-items: center;
      .items-img {
        width: 60px;
        img {
          width: 100%;
          height: 60px;
          border-radius: 50%;
          display: block;
        }
      }
      .info {
        flex: 1;
        margin-left: 10px;
        overflow: hidden;
        // .name {
        // }
        .desc {
          padding-top: 3px;
          font-size: 12px;
          color: #999;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .follower {
        width: 60px;
        padding: 3px;
        text-align: center;
        border-radius: 20px;
        font-size: 12px;
        color: @klColor;
        border: 1px solid @klColor;
      }
    }
  }
}
</style>
