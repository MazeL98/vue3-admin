<template>
  <div class="staff-manage-container">
    <export v-model="exVisible" ref="exportRef"></export>
    <el-card class="excel-card">
      <el-button
        type="primary"
        size="small"
        @click="handleRedirect"
        v-permission="['ImportStaff']"
        >{{ $t('msg.excel.importExcel') }}</el-button
      >
      <el-button type="success" size="small" @click.stop="handleExport">{{
        $t('msg.excel.exportExcel')
      }}</el-button>
    </el-card>
    <el-card>
      <el-table :data="staffList" border style="width: 100%">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column
          :label="$t('msg.excel.name')"
          prop="username"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.excel.mobile')"
          prop="mobile"
        ></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="staff-avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
              style="width: 60px, height:60px"
          /></template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')">
          <template v-slot="{ row }">
            <div v-if="row.role">
              <el-tag
                type="success"
                v-for="value in row.role"
                :key="value"
                size="mini"
                >{{ value }}</el-tag
              >
            </div>
            <div v-else>
              <el-tag>{{ $t('msg.excel.defaultRole') }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('msg.excel.openTime')"
          prop="openTime"
        ></el-table-column>
        <el-table-column
          :label="$t('msg.excel.action')"
          width="250px"
          fixed="right"
        >
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="showInfo(row._id)">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button
              type="info"
              size="mini"
              @click="showRole(row)"
              v-permission="['DistributeRole']"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="removeStaff(row)"
              v-permission="['RemoveStaff']"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="staff-pagination"
        :total="total"
        layout="total,sizes,prev,pager,next,jumper"
        :current-page="page"
        @update:current-page="handleCurrentChange"
        @update:page-size="handleSizeChange"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
      />
    </el-card>
    <export-to-excel v-model="exVisible"></export-to-excel>
    <role
      v-model="roleVisible"
      :staffId="curStaffId"
      @updateRole="getListData"
    ></role>
  </div>
</template>

<script setup>
import ExportToExcel from './ExportToExcel.vue'
import Role from './Role.vue'
import { ref, onActivated, watch } from 'vue'
import { getStaffList, deleteStaff } from '@/api/staff-manage.js'
import { watchLangSwitch } from '@/utils/i18n'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useI18n } from 'vue-i18n'
const staffList = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(5)

// 获取员工数据
const getListData = async () => {
  const result = await getStaffList({ page: page.value, size: size.value })
  staffList.value = result.list
  total.value = result.total
}
getListData()
// 监听语言变化，重新获取员工数据
watchLangSwitch(getListData)

const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// 点击跳转到excel上传页面
const router = useRouter()
const handleRedirect = () => {
  router.push('/staff/import')
}

// 导入新员工数据后，重新加载数据
onActivated(getListData)

// 删除某个员工数据
const i18n = useI18n()
const removeStaff = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    {
      type: 'warning'
    }
  ).then(async () => {
    await deleteStaff(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    getListData()
  })
}

// 导出为excel 文件
const exVisible = ref(false)
const handleExport = () => {
  exVisible.value = true
}

// 点击查看指定员工资料
const showInfo = (id) => {
  router.push(`/staff/info/${id}`)
}

// 打开角色分编辑对话框，向对话框传入当前员工id值
const roleVisible = ref(false)
const curStaffId = ref('')
const showRole = (row) => {
  roleVisible.value = true
  curStaffId.value = row._id
}

watch(roleVisible, (val) => {
  if (!val) {
    curStaffId.value = ''
  }
})
</script>

<style lang="scss" scoped>
.staff-manage-container {
  .excel-card {
    margin-bottom: 20px;
    text-align: right;
  }

  ::v-deep(.el-tag) {
    margin-right: 5px;
  }
}
.staff-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.staff-pagination {
  margin-top: 30px;
  text-align: center;
}
</style>
