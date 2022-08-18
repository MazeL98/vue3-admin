import router from '@/router'
import store from '@/store'
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // 如果已有token，不进入登录页
    if (to.path === '/login') {
      next('/')
    } else {
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        // 获取用户信息后拿到对应的权限，dispatch给筛选器
        const filteredRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        filteredRoutes.forEach((item) => {
          router.addRoute(item)
        })
        return next(to.path)
      } else {
        next()
      }
    }
  } else {
    // 如果没有 token，to.path 是白名单中的某个路由，允许跳转
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next({ path: '/login' })
    }
  }
})
