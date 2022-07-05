import i18n from '@/i18n'
/**
 * 判断是否为外部资源
 * @param {*} path
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test()
}

export function validatePassword() {
  return (rule, value, callback) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
