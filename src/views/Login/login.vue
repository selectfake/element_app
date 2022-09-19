<template>
  <div class="login">
    <img src="../../assets/img/ele_logo.png" alt="my login img" class="logo" />
    <input-group
      placeholder="手机号"
      type="number"
      v-model="phone"
      :btnTitle="btnTitle"
      :error="error.phone"
      :disabled="disabled"
      @btnClick="getVerifyCode()"
    ></input-group>
    <input-group
      placeholder="验证码"
      v-model="verifyCode"
      type="number"
      :error="error.code"
    ></input-group>
    <div v-if="false" class="invalid-feedback">报错信息</div>
    <div class="login-des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》和《隐私权政策》</span>
      </p>
    </div>
    <div class="login-btn">
      <button>登录</button>
    </div>
  </div>
</template>

<script setup>
import InputGroup from "../../components/InputGroup.vue";
import { ref } from "vue";
let phone = ref("");
let verifyCode = ref("");
let error = ref({});
let btnTitle = ref("获取验证码");
let disabled = ref(false);

const getVerifyCode = () => {
  console.log("111");
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  padding: 30px;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
  .logo {
    width: 130px;
    height: 56px;
    margin-top: 10px;
  }
}
.login-des {
  color: #aaa;
  line-height: 22px;
  text-align: left;
  span {
    color: #4d90fe;
  }
}
.login-btn {
  button {
    width: 100%;
    height: 40px;
    background-color: #48ca38;
    border-radius: 4px;
    color: white;
    font-size: 14px;
    border: none;
    outline: none;
  }
  button[disabled] {
    background-color: #8bda81;
  }
}
/*表单样式*/
.text-group,
.login-btn,
.login-des {
  margin-top: 20px;
}
.input-group {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 13px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    width: 60%;
    outline: none;
    border: none;
  }
  button {
    border: none;
    outline: none;
    background: #fff;
  }
  button[disabled] {
    color: #aaa;
  }
}
is-invalid {
  border: 1px solid red;
}
.invalid-feedback {
  color: red;
  padding-top: 5px;
}
</style>