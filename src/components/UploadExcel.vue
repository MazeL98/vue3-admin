<!--  -->
<template>
  <div class="upload-excel-container">
    <div class="click-upload">
      <el-button type="primary" @click="handleClick" :loading="loading">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
    </div>
    <input
      ref="btnUploadInput"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <div
      class="drop-upload"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragenter"
    >
      <i class="el-icon-upload"></i>
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from '@/utils/excel.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  beforeUpload: Function,
  onSuccess: Function
})

const btnUploadInput = ref(null)
const loading = ref(false)

// 点击上传
const handleClick = () => {
  btnUploadInput.value.click()
}
// 获取上传文件
const handleChange = (e) => {
  const files = e.target.files
  if (!files[0]) return
  const rawFile = files[0]
  upload(rawFile)
}

// 定义上传函数
const upload = (rawFile) => {
  btnUploadInput.value.value = null
  if (!props.beforeUpload) {
    readData(rawFile)
    return
  }
  const before = props.beforeUpload(rawFile)
  if (before) {
    readData(rawFile)
  }
}

// 读取上传文件的数据
const readData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      // 被上传的文件以 ArrayBuffer 的格式存储在 data 中
      const data = e.target.result
      // 用 xlsx 解析数据
      const workbook = XLSX.read(data, { type: 'array' })
      // 获取第一张表格的名称
      const firstSheetName = workbook.SheetNames[0]
      // 获取第一张表格数据
      const workSheet = workbook.Sheets[firstSheetName]
      // 解析表格表头
      const header = getHeaderRow(workSheet)
      // 解析表格body
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 调用上传后的回调函数
      generateData({ header, results })
      resolve()
    }
    reader.readAsArrayBuffer(rawFile)
  })
}

const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}

const handleDrop = (e) => {
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('请至少上传一个文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件格式必须是.xlsx, .xls, .csv ')
    return false
  }
  upload(rawFile)
}
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}
const handleDragenter = () => {}
</script>

<style lang="scss" scoped>
.upload-excel-container {
  display: flex;
  margin-top: 100px;
  justify-content: center;
  text-align: center;
  .click-upload,
  .drop-upload {
    width: 350px;
    height: 160px;
    border: 1px dashed #bbb;
  }

  .click-upload {
    line-height: 160px;
  }

  .drop-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #bbb;
  }

  input {
    display: none;
    z-index: -9999;
  }
}
</style>
