import i18n from '@/i18n'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入 element-plus
import installElementPlus from './plugins/element'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import installSvgIcons from './icons/index.js'

// 引入 echarts.js
import * as echarts from 'echarts'

// 时间戳转换过滤器
import installFilter from '@/filter'

// 打印指令
import installDirective from '@/directives'

import './permission.js'
import './styles/index.scss'

const app = createApp(App)
installElementPlus(app)
installFilter(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
installSvgIcons(app)
installDirective(app)
app.config.globalProperties.echarts = echarts
app.use(store).use(router).use(i18n).mount('#app')
