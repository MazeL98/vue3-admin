import { watch } from 'vue'
import store from '@/store'
export function watchLangSwitch(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language))
    }
  )
}
