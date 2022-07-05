import path from 'path'
import i18n from '@/i18n'
/**
 * 获取所有子路由
 */
const getChildRoutes = (routes) => {
  const result = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 *  处理getRoutes()导致的重复路由
 */
export const filterRoutes = (routes) => {
  // 获取所有子路由，查重子路由
  const childRoutes = getChildRoutes(routes)
  return routes.filter((route) => {
    // 取反，让所有重复路由返回值为false
    return !childRoutes.find((childRoute) => {
      return childRoute.path === route.path
    })
  })
}

/**
 *  鉴定数组或对象为空
 */
const isNull = (data) => {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
}

/**
 * 生成侧边栏需要的路由数据
 */

export const generateRoutes = (routes, basePath = '') => {
  const result = []
  // 剔除 meta 属性不完整的 （return 中止）
  // 两种情况: 自己meta为空且没有子路由，自己meta为空但还有子路由
  // 对子路由递归调用。
  routes.forEach((route) => {
    if (isNull(route.meta) && isNull(route.children)) return
    if (isNull(route.meta) && !isNull(route.children)) {
      result.push(...generateRoutes(route.children, route.path))
      return
    }
    // 存在meta
    const routePath = path.resolve(basePath, route.path)
    // newRoute 相当于一个临时的对象
    // 将 path 重写为绝对路径
    // 将 children 暂时清空，对子路由递归调用generateRoutes() 后再把符合条件的子路由 push 进来
    let newRoute = result.find((item) => item.path === routePath)
    if (!newRoute) {
      newRoute = {
        ...route,
        path: routePath,
        children: []
      }
      if (newRoute.meta.icon && newRoute.meta.title) {
        result.push(newRoute)
      }
    }
    if (route.children && route.children.length > 0) {
      newRoute.children.push(...generateRoutes(route.children, route.path))
    }
  })
  return result
}

export const generateSearchPool = (
  routes,
  basePath = '/',
  prefixTitle = []
) => {
  let result = []
  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }
    // 若存在 meta.title 且非动态路由，对title国际化处理，合并到 data.title 中
    // 若path中出现任何 /: 则表明是动态路由
    const regex = /.*\/:.*/
    if (route.meta && route.meta.title && !regex.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      result.push(data)
    }
    // 若存在 children，递归调用
    if (route.children && route.children.length > 0) {
      const childResult = generateSearchPool(
        route.children,
        data.path,
        data.title
      )
      result = [...result, ...childResult]
    }
  }
  return result
}
