<!--  -->
<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    width="30%"
    @close="closed"
    :model-value="modelValue"
  >
    <el-input
      :placeholder="$t('msg.excel.defaultName')"
      v-model="excelTitle"
    ></el-input>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
        <el-button type="primary" @click="onConfirm" :loading="loading">{{
          $t('msg.excel.confirm')
        }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { watchLangSwitch } from '@/utils/i18n'
import { useI18n } from 'vue-i18n'
import { getAllStaffList } from '@/api/staff-manage.js'
import { USER_RELATIONS } from '@/utils/export2excelConstants.js'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 对标题做国际化处理
const i18n = useI18n()
const excelTitle = ref(i18n.t('msg.excel.defaultName'))
watchLangSwitch(() => {
  excelTitle.value = i18n.t('msg.excel.defaultName')
})

const loading = ref(false)
const closed = () => {
  loading.value = false
  emits('update:modelValue', false)
}

const onConfirm = async () => {
  loading.value = true
  const allStaff = (await getAllStaffList()).list
  const excel = await import('@/utils/export2excel.js')
  const data = formatJson(USER_RELATIONS, allStaff)
  excel.export_json_to_excel({
    // excel 表头
    header: Object.keys(USER_RELATIONS),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: excelTitle.value,
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })
  closed()
}

// 将原数据转换为二维数组
const formatJson = (headers, jsonData) => {
  return jsonData.map((item) => {
    return Object.keys(headers).map((key) => {
      if (headers[key] === 'role') {
        // 取出role 的值，把该对象中的key值转换成字符串
        const roles = item[headers[key]]
        return Object.values(roles).join(',')
      }
      return item[headers[key]]
    })
  })
}
</script>

<style lang="scss" scoped></style>
