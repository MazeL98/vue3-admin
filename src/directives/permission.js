import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const points = store.getters.userInfo.permission.points
  if (value && value instanceof Array) {
    const hasPermission = points.some((point) => {
      return value.includes(point)
    })
    // 如果用户的权限中不包含本功能，就删除功能按钮
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    // eslint-disabled-next-line
    throw new Error('v-permission value is  ["admin","editor"] ')
  }
}

export default {
  mounted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
