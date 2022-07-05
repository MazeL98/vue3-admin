import request from '@/utils/request.js'

export const getFeature = () => {
  return request({
    url: '/app/feature'
  })
}
