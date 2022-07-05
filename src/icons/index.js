// 全局注册 svg-icon 组件
import SvgIcon from '../components/svgIcon/index.vue'

// 导入所有 svg 文件
// 返回的是一个 require 函数, require.keys() 可以获得所有符合条件的模块数组
const svgRequire = require.context('./svg', false, /\.svg$/)
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

export default (app) => {
  app.component('svg-icon', SvgIcon)
}
