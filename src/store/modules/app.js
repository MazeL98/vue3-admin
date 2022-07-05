import { setItem, getItem } from '@/utils/storage.js'
import { LANG, TAGS_VIEW } from '@/constant/index.js'

const state = {
  sidebarOpened: true,
  language: getItem(LANG) || 'zh',
  tagsViewList: getItem(TAGS_VIEW) || []
}
const mutations = {
  toggleSidebar(state) {
    state.sidebarOpened = !state.sidebarOpened
  },
  setLanguage(state, lang) {
    setItem(LANG, lang)
    state.language = lang
  },
  // 添加标签
  addTagsViewList(state, tag) {
    const isFind = state.tagsViewList.find((item) => {
      return item.path === tag.path
    })
    if (!isFind) {
      state.tagsViewList.push(tag)
    }
    setItem(TAGS_VIEW, state.tagsViewList)
  },
  // 标签标题响应国际化变化
  changeTagsTitle(state, { index, tag }) {
    state.tagsViewList[index] = tag
    setItem(TAGS_VIEW, state.tagsViewList)
  },
  // 关闭标签
  removeTag(state, payload) {
    if (payload.type === 'current') {
      state.tagsViewList.splice(payload.index, 1)
    }
    if (payload.type === 'others') {
      state.tagsViewList.splice(
        payload.index + 1,
        state.tagsViewList.length - payload.index + 1
      )
      state.tagsViewList.splice(0, payload.index)
    }
    if (payload.type === 'right') {
      state.tagsViewList.splice(
        payload.index + 1,
        state.tagsViewList.length - payload.index + 1
      )
    }
    setItem(TAGS_VIEW, state.tagsViewList)
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
