import i18n from '@/i18n'

const whiteList = ['/', '/404', '/401', '/import']

export function isTag(path) {
  return !whiteList.includes(path)
}

export function getTitle(route) {
  let title = ''
  if (route.meta.title) {
    title = i18n.global.t(`msg.route.${route.meta.title}`)
  } else {
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  }
  return title
}
