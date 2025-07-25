<template>
  <div class="register">
    <navbar>
      <template #left>
        <span class="fa-arrow-left back" @click="back"></span>
      </template>
      <template #center>手机号注册</template>
    </navbar>
    <input
      class="input"
      type="password"
      v-model.trim="pawd"
      placeholder="设置登录密码，不少于6位"
    />
    <div class="next" @click="next">下一步</div>

    <!-- 昵称框 -->
    <div class="nickname" v-show="isShow">
      <navbar>
        <template #left>
          <span class="fa-arrow-left back" @click="isShow = false"></span>
        </template>
        <template #center>手机号注册</template>
      </navbar>
      <input
        class="input"
        type="text"
        v-model.trim="nickname"
        placeholder="请输入您的昵称"
      />
      <div class="next" @click="register">注册</div>
    </div>
  </div>
</template>

<script lang="ts">
import navbar from "@/components/common/navbar/navbar.vue";
import { registerAccount } from "@/service/login";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      pawd: "",
      nickname: "",
      isShow: false,
      verifyCode: "",
    };
  },

  created() {
    this.$bus.on("verifycodeVal", (code: string) => {
      this.verifyCode = code;
    });
  },
  methods: {
    back() {
      this.$router.back();
    },
    next() {
      if (this.pawd == "") {
        this.$toast("请输入密码，在进行下一步操作");
        return false;
      }
      this.isShow = true;
    },
    async register() {
      if (this.nickname == "") {
        this.$toast("请输入昵称，在进行注册");
        return false;
      }
      let res = await registerAccount(
        this.verifyCode,
        this.$store.state.loginAccount,
        this.pawd,
        this.nickname
      );
      if (res.code === 200) {
        console.log(res);
      }
    },
  },
};
</script>
<style scoped lang="less">
.register {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 0;
  background-color: white;
  z-index: 999;
  .input {
    height: 35px;
    line-height: 35px;
    width: 92%;
    margin-left: 10px;
    padding-left: 10px;
    border: none;
    outline: none;
    border-bottom: 1px solid #dedede;
  }
  .next {
    margin: 35px;
    background-color: #e00;
    text-align: center;
    color: #fff;
    padding: 10px;
    border-radius: 20px;
  }
  .nickname {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 0;
    background-color: white;
    z-index: 1010;
  }
}
</style>
