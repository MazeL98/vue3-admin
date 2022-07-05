import getDynamicData from './DynamicData'
import { watchLangSwitch } from '@/utils/i18n.js'
import { watch, ref } from 'vue'

// 所有列的数据
export const dynamicData = ref(getDynamicData())

// 被勾选的列数据
export const selectedLabel = ref([])
// 初始化被勾选数据，只需要 label值，也就是 title
const initSelectedLabel = () => {
  selectedLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectedLabel()

// 绑定table的数据
export const tableColumns = ref([])
// 监听勾选项，赋值给table数据
watch(
  selectedLabel,
  (val) => {
    // 先清空 table数据
    tableColumns.value = []
    const selectedData = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selectedData)
  },
  {
    immediate: true
  }
)

watchLangSwitch(() => {
  dynamicData.value = getDynamicData()
  initSelectedLabel()
})
