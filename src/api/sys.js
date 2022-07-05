import request from '@/utils/request.js'

export const login = (data) => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data: data,
    headers: { 'Content-Type': 'application/json' }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}
