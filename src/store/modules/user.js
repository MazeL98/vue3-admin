import { login, getUserInfo } from '@/api/sys.js'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage.js'
import { TOKEN } from '@/constant/index.js'
import router, { resetRouter } from '@/router'

const state = {
  token: getItem(TOKEN) || '',
  userInfo: {}
}

const mutations = {
  setToken(state, token) {
    setItem(TOKEN, token)
    state.token = token
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  /**
   *  登录
   */
  loginApp({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username,
        // 对密码进行 md5 加密处理，防止被拦截而泄露
        password: md5(password)
      })
        .then((result) => {
          commit('setToken', result.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  /**
   *  获取用户基本信息
   */
  async getUserInfo({ commit }) {
    const result = await getUserInfo()
    commit('setUserInfo', result)
    return result
  },
  /**
   *  退出登录
   */
  logout({ commit }) {
    commit('setToken', '')
    commit('setUserInfo', {})
    // 清理所有本地缓存
    removeAllItem()
    // 清除所有路由表
    resetRouter()
    router.push('/login')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
