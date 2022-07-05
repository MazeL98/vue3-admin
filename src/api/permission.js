import request from '@/utils/request.js'

export const getAllPermission = () => {
  return request({
    url: '/permission/list'
  })
}
