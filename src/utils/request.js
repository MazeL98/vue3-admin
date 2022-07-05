import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isTokenTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 3000
})

service.interceptors.request.use(
  (config) => {
    if (store.getters.token) {
      // 检验 token是否失效
      if (isTokenTimeout()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token已失效，请重新登录'))
      }
      config.headers.authorization = store.getters.token
    }
    // 在请求头中设置所求数据的语言
    config.headers.acceptlanguage = store.getters.language
    return config
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)

service.interceptors.response.use(
  (result) => {
    // 服务器成功响应
    const { success, message, data } = result.data
    if (success) {
      return data
    } else {
      ElMessage(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // token 过期
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/logout')
    }
    // 服务器没有响应
    ElMessage(error.message)
    return Promise.reject(new Error(error))
  }
)

export default service
