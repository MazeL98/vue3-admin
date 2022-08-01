<!--  -->
<template>
  <div class="">
    <upload-excel :onSuccess="onSuccess"></upload-excel>
  </div>
</template>

<script setup>
import {} from 'vue'
import UploadExcel from '@/components/UploadExcel.vue'
import { staffBatchImport } from '@/api/staff-manage.js'
import { generateData } from '@/utils/excel.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const router = useRouter()
const i18n = useI18n()
const onSuccess = async ({ header, results }) => {
  const updateData = generateData(results)
  await staffBatchImport(updateData)
  ElMessage.success(results.length + i18n.t('msg.excel.importSuccess'))
  router.push('/staff/manage')
}
</script>

<style lang="scss" scoped></style>
