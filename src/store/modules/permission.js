import { publicRoutes, privateRoutes } from '@/router'

const state = {
  routes: [...publicRoutes]
}

const mutations = {
  setRoutes(state, newRoutes) {
    state.routes = [...publicRoutes, ...newRoutes]
  }
}

const actions = {
  filterRoutes({ commit }, menus) {
    const routes = []
    // 对于用户资料里的权限名，找到路由表中相应的部分并返回
    menus.forEach((key) => {
      routes.push(...privateRoutes.filter((item) => item.name === key))
    })
    commit('setRoutes', routes)
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
