<template>
  <div class="">
    <el-card>
      <el-table :data="allRoleList" stripe border class="role-list-table">
        <el-table-column
          type="index"
          :label="$t('msg.role.index')"
          width="100"
        />
        <el-table-column prop="title" :label="$t('msg.role.name')" />
        <el-table-column prop="describe" :label="$t('msg.role.desc')" />
        <el-table-column
          prop="action"
          :label="$t('msg.role.action')"
          width="250"
        >
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              class="permission-button"
              @click="onDistribute(row)"
              v-permission="['DistributePermission']"
            >
              {{ $t('msg.role.assignPermissions') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <distribute-permission
      v-model="distributeVisible"
      :roleId="selectedRoleId"
    ></distribute-permission>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getRoleList } from '@/api/role.js'
import { watchLangSwitch } from '@/utils/i18n.js'
import DistributePermission from './DistributePermission.vue'

const allRoleList = ref([])
const getRole = async () => {
  allRoleList.value = await getRoleList()
}

getRole()
watchLangSwitch(getRole)

// 为角色分配权限对话框
const distributeVisible = ref(false)
const selectedRoleId = ref('')
const onDistribute = (row) => {
  distributeVisible.value = true
  selectedRoleId.value = row.id
}
</script>

<style lang="scss" scoped>
.role-list-table {
  ::v-deep .el-table__cell {
    padding: 8px 0;
    & .cell {
      padding-left: 15px;
    }
  }
}
</style>
