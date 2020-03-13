<template>
  <div class="verify-code">
    <div class="verify-code-input" ref="verifiCodeInput">
      <input
        :style="[styleObj]"
        class="input-item"
        v-for="item of count"
        :key="item"
        type="text"
        :data-index="item"
        v-model="valueList[item]"
        maxlength="1"
        @keypress="rule"
        @input="rule2"
        @keydown="backSpace"
        @keyup="nextFocus"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true
    },
    mode: {
      type: String,
      default: "number",
      validator: function(value) {
        return ["letter", "number", "letter-number"].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      InputBoxWidth: 0,
      valueList: [-1]
    };
  },
  methods: {
    rule(event) {
      if (this.mode === "number") {
        let keyCode = event.keyCode;
        if (keyCode >= 48 && keyCode <= 57) {
          event.returnValue = true;
        } else {
          event.returnValue = false;
        }
      }
    },
    rule2(event) {
      // 不能输入中文
      if (/[\u4e00-\u9fa5]/.test(event.target.value)) {
        event.target.value = "";
        event.returnValue = false;
      }
      // 根据mode进行正则匹配，不适合的过滤
      switch (this.mode) {
        case "number":
          if (/[a-zA-Z]/.test(event.target.value)) {
            event.target.value = "";
            event.returnValue = false;
          }
          break;
        case "letter":
          if(/[0-9]/.test(event.target.value)){
            this.$set(this.valueList,event.target.getAttribute('data-index'),'')
            event.returnValue = false;
          }
          break;
        case "letter-number":
          break;
      }
    },
    backSpace(event){
       let value = event.target.value
      if(event.keyCode ===8 &&  (value===undefined || value===""||value===null)){
        event.target.previousElementSibling && event.target.previousElementSibling.focus()
      }
    },
    nextFocus(event){
      let value = event.target.value
      if( event.keyCode!=8 && (value!=undefined || value!=""||value!=null)){
        event.target.nextElementSibling &&  event.target.nextElementSibling.focus()       
      }
    }
  },
  mounted() {
    this.InputBoxWidth = this.$refs.verifiCodeInput.offsetWidth;
  },
  computed: {
    styleObj() {
      if (this.InputBoxWidth != 0) {
        let eachInputWidth = this.InputBoxWidth / (this.count * 2);
        return {
          width: eachInputWidth + "px"
        };
      }
    }
  },
  watch: {
    valueList: function(newVal) {
      let arr = [];
      if (newVal.length === this.count + 1) {
        for (let item of newVal) {
          if (item == undefined || item == null || item == "") {
            return false;
          } else {
            arr.push(item);
          }
        }
        if (arr.length === this.count + 1) {
          var str = "";
          for (let i = 1; i < arr.length; i++) {
            str += arr[i];
          }
          this.$emit("inputComplete", str);
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.verify-code {
  margin-top: 30px;
  .verify-code-input {
    position: relative;
    text-align: center;
    .input-item {
      outline: none;
      border: none;
      border-bottom: 1px solid #ccc;
      margin: 12px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      ime-mode: disabled; // 禁止输入中文  谷歌中可能不支持
    }
  }
}
</style>