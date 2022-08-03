<template>
  <div class="login-container">
    <el-card class="card-container" shadow="always">
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="loginRules"
        :loading="loading"
        ref="formRef"
      >
        <div class="avatar-container">
          <user class="login-avatar"></user>
        </div>
        <div class="title-container">
          <div class="title">{{ $t('msg.login.title') }}</div>
          <lang-select class="login-lang-select"></lang-select>
        </div>
        <el-form-item class="login-form-item" prop="username">
          <el-input
            placeholder="Username"
            name="username"
            type="text"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>

        <el-form-item class="login-form-item" prop="password">
          <el-input
            placeholder="Password"
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
    </el-card>

    <div class="login-desc" v-html="$t('msg.login.desc')"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { validatePassword } from '@/utils/validate.js'
import { useStore } from 'vuex'
import router from '@/router'
import { setTimeStamp } from '@/utils/auth.js'
import { useI18n } from 'vue-i18n'
import LangSelect from '@/components/LangSelect.vue'
import { User } from '@element-plus/icons-vue'
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
}
// 主题色
const mainColor = computed(() => {
  return store.getters.mainColor
})
</script>

<style lang="scss" scoped>
$title_color: v-bind(mainColor);

.login-container {
  background: #f9f9fd;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
}

.card-container {
  width: 350px;
  margin: 150px auto 30px;
  border-radius: 8px;
  ::v-deep(.el-card__body) {
    padding: 20px 35px;
  }
}

.login-form {
  position: relative;
  width: 100%;
  text-align: center;

  .avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    width: 60px;
    height: 60px;
    text-align: center;
    border-radius: 50%;
    background-color: $title_color;

    .login-avatar {
      color: white;
      width: 25px;
      height: 25px;
    }
  }
  .title-container {
    position: relative;
    width: 100%;
    text-align: center;
    color: $title_color;
    padding-bottom: 30px;

    .login-lang-select {
      position: absolute;
      top: 0;
      right: 0;
      ::v-deep(.language-icon) {
        font-size: 18px;
        padding: 2px;
        background-color: #fff;
        border-radius: 3px;
        cursor: pointer;
      }
    }
    .title {
      font-size: 16px;
      font-weight: 600;
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    background: #f2f2f2;
    margin-bottom: 30px;

    .el-input {
      display: inline-block;
      height: 40px;
      width: 90%;
      font-size: 16px;

      ::v-deep(input) {
        background-color: transparent;
        border: none;
        letter-spacing: 0.5px;
        padding: 12px 5px 12px 0px;
        vertical-align: middle;
        color: $title_color;
        caret-color: $title_color;
      }
    }
  }

  .show-pwd {
    position: absolute;
    right: 15px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}

.login-desc {
  margin-left: 100px;
  color: $title_color;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
}
</style>
