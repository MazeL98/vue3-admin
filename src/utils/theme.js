import formula from '@/constant/formula.json'
import rgbHex from 'rgb-hex'
import color from 'css-color-function'
import axios from 'axios'

/**
 * 把新CSS文本作为样式注入到HTML中
 * @param {*} newStyle 新CSS文本
 */
export const writeNewStyle = (newStyle) => {
  const style = document.createElement('style')
  style.innerText = newStyle
  document.head.appendChild(style)
}

/**
 *
 * @param {*} primaryColor 传入主色
 * @returns  返回写入新颜色值的CSS文本
 */
export const generateNewStyle = async (primaryColor) => {
  // 1、根据 primary 颜色生成新的色值表
  const colors = generateColors(primaryColor)
  // 2、获取element-plus 默认样式表，为替换色值打标记
  let cssText = await getOriginalStyle()
  // 3、遍历新色值表，在默认样式表全局替换
  Object.keys(colors).forEach((key) => {
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })
  return cssText
}

/**
 *
 * @param {*} primary 传入主色
 * @returns 生成新的色值表
 */
export const generateColors = (primary) => {
  if (!primary) return
  const colors = {
    primary
  }
  Object.keys(formula).forEach((key) => {
    const value = formula[key].replace(new RegExp('(primary)', 'g'), primary)
    colors[key] = '#' + rgbHex(color.convert(value))
  })
  return colors
}

/**
 * 以网络请求的方式获取 element-plus 的原始CSS文件
 * @returns 把原始CSS表中需要替换的部分打上标记，并返回新的表
 */
const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  return getStyleTemplate(data)
}

const getStyleTemplate = (data) => {
  const colorMap = {
    '#3a8ee6': 'shade-1',
    '#337ecc': 'primary',
    '#409eff': 'primary',
    '#0d84ff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  Object.keys(colorMap).forEach((key) => {
    data = data.replace(new RegExp(key, 'ig'), colorMap[key])
  })
  return data
}
