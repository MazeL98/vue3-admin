import request from '@/utils/request.js'

export const getOverview = (date) => {
  return request({
    url: '/chart/overview',
    params: date
  })
}

export const getTrend = (date) => {
  return request({
    url: '/chart/trend',
    params: date
  })
}

export const getCalendar = () => {
  return request({
    url: '/chart/calendar'
  })
}

export const getTimePoint = (date) => {
  return request({
    url: '/chart/time/balance',
    params: date
  })
}
