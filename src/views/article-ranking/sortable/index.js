import { ref } from 'vue'
import Sortable from 'sortablejs'
import { SortArticle } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'
export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  const el = tableRef.value.$el.querySelectorAll('.el-table__body > tbody')[0]
  Sortable.create(el, {
    ghostClass: 'sortable-ghost',
    async onEnd(event) {
      const { newIndex, oldIndex } = event
      await SortArticle({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })
      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))
      tableData.value = []
      cb && cb()
    }
  })
}
