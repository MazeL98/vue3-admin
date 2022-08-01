<!--  -->
<template>
  <div class="article-ranking-container">
    <el-card>
      <div class="dynamic-box">
        <span>{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectedLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="articleList"
        ref="tableRef"
        style="width: 100%"
        border
        stripe
        class="article-ranking-table"
      >
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.prop === 'ranking' ? 120 : 250"
        >
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button type="primary" size="mini" @click="onShowArticle(row)">{{
              $t('msg.article.show')
            }}</el-button>
            <el-button type="danger" size="mini" @click="onRemove(row)">{{
              $t('msg.article.remove')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="total"
        layout="sizes,total,prev,pager,next,jumper"
        :page-size="size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[2, 5, 10]"
        class="article-pagination"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted, computed } from 'vue'
import { getAllArticleList, deleteArticle } from '@/api/article.js'
import { watchLangSwitch } from '@/utils/i18n'
import { dynamicData, selectedLabel, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const articleList = ref([])
const page = ref(1)
const size = ref(10)
const total = ref(0)
const getArticleList = async () => {
  const result = await getAllArticleList({
    page: page.value,
    size: size.value
  })
  articleList.value = result.list
  total.value = result.total
}
getArticleList()
onMounted(() => {
  initSortable(articleList, getArticleList)
})
onActivated(getArticleList)

watchLangSwitch(getArticleList)

const router = useRouter()
const onShowArticle = (row) => {
  router.push(`/article/${row._id}`)
}

const i18n = useI18n()
const onRemove = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    getArticleList()
  })
}

const handleSizeChange = (val) => {
  size.value = val
  getArticleList()
}

const handleCurrentChange = (val) => {
  page.value = val
  getArticleList()
}

// 拖拽时的UI样式
const store = useStore()
const sortableColor = computed(() => {
  return store.getters.mainColor
})
</script>

<style lang="scss" scoped>
.article-ranking-table {
  ::v-deep .el-table__cell {
    padding: 10px 0;
    & .cell {
      padding-left: 20px;
    }
  }

  ::v-deep .sortable-ghost {
    opacity: 0.5;
    color: #fff !important;
    background: v-bind(sortableColor);
  }
}

.article-pagination {
  margin: 30px 0 20px -10px;
}
</style>
