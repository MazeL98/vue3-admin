/*
 * 存储数据
 */

export const setItem = (key, value) => {
  // 如果是复杂数据类型
  if (value.typeof === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, JSON.stringify(value))
}

/*
 * 取出数据
 */
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/*
 * 删除某个数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

/*
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
