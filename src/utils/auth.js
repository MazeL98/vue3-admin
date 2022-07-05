import { TOKEN_TIMEOUT_VALUE, TIME_STAMP } from '../constant'
import { setItem, getItem } from './storage'

/**
 *  存储时间戳
 */

export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 获取时间戳
 */

export function getTimeStamp() {
  return getItem(TIME_STAMP)
}

/**
 * 比较是否超过有效时限
 */
export function isTokenTimeout() {
  const currentTime = Date.now()
  const loginTimeStamp = getTimeStamp()
  return currentTime - loginTimeStamp > TOKEN_TIMEOUT_VALUE
}
