import { createI18n } from 'vue-i18n'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import store from '@/store'
const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}
function getLocale() {
  return store && store.getters && store.getters.language
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLocale(),
  messages
})

export default i18n
