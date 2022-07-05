<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      :loading="loading"
      ref="formRef"
    >
      <div class="title-container">
        <div class="title">{{ $t('msg.login.title') }}</div>
        <lang-select class="login-lang-select"></lang-select>
      </div>
      <el-form-item class="login-form-item" prop="username">
        <span class="icon-container">
          <svg-icon icon="user"></svg-icon>
        </span>
        <el-input
          placeholder="username"
          name="username"
          type="text"
          v-model="loginForm.username"
        ></el-input>
      </el-form-item>

      <el-form-item class="login-form-item" prop="password">
        <span class="icon-container">
          <svg-icon icon="password"></svg-icon>
        </span>
        <el-input
          placeholder="password"
          name="password"
          :type="passwordType"
          v-model="loginForm.password"
          ref="pwdInput"
        ></el-input>
        <span class="show-pwd" @click="onChangePasswordType">
          <svg-icon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
          ></svg-icon>
        </span>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin(formRef)"
        >{{ $t('msg.login.loginBtn') }}</el-button
      >
    </el-form>
    <div class="login-desc" v-html="$t('msg.login.desc')"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validatePassword } from '@/utils/validate.js'
import { useStore } from 'vuex'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth.js'
import { useI18n } from 'vue-i18n'
import LangSelect from '@/components/LangSelect.vue'

const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

const i18n = useI18n()
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword()
    }
  ]
})
// 显示密码与隐藏密码
const passwordType = ref('password')
const pwdInput = ref(null)
const onChangePasswordType = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
    pwdInput.value.focus()
  } else {
    passwordType.value = 'password'
  }
}

const loading = ref(false)
const formRef = ref(null)
const store = useStore()
const handleLogin = (formEl) => {
  if (!formEl) return
  // 表单校验
  formRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      // 触发登录动作
      store
        .dispatch('user/loginApp', loginForm.value)
        .then(() => {
          router.push('/')
          // 保存登录时间戳
          setTimeStamp()
          loading.value = false
        })
        .catch((error) => {
          loading.value = false
          console.log(error)
        })
    }
  })

  // 触发登录请求
}
</script>

<style lang="scss" scoped>
$loginBg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  background: $loginBg;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}
.login-form {
  position: relative;
  width: 520px;
  margin: 0 auto;
  padding: 150px 30px 0;

  .title-container {
    position: relative;
    width: 100%;
    text-align: center;
    color: $light_gray;
    padding-bottom: 30px;

    .login-lang-select {
      position: absolute;
      top: 0;
      right: 0;
      ::v-deep .language-icon {
        font-size: 20px;
        padding: 2px;
        background-color: #fff;
        border-radius: 3px;
        cursor: pointer;
      }
    }
    .title {
      font-size: 24px;
      font-weight: bold;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.2);
    color: $dark_gray;

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      ::v-deep input {
        background-color: transparent;
        border: none;
        padding: 10px 5px 12px 15px;
        vertical-align: middle;
        color: $light_gray;
        caret-color: $cursor;
      }
    }
  }

  .icon-container {
    padding: 7px 5px 6px 15px;
    vertical-align: middle;
    display: inline-block;
    font-size: 16px;
  }

  .show-pwd {
    position: absolute;
    right: 20px;
    top: 7px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}

.login-desc {
  color: white;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}
</style>
