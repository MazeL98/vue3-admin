import { setItem, getItem } from '@/utils/storage.js'
import { MAIN_COLOR, DEFAULT_COLOR } from '@/constant'
import variables from '@/styles/variables.scss'
const state = {
  mainColor: getItem(MAIN_COLOR) || DEFAULT_COLOR,
  variables: variables
}

const mutations = {
  setMainColor(state, newColor) {
    state.mainColor = newColor
    state.variables.menuBg = newColor
    setItem(MAIN_COLOR, newColor)
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
