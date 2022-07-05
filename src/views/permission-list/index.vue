<!--  -->
<template>
  <div class="">
    <el-card>
      <el-table
        :data="allPermission"
        border
        stripe
        row-key="id"
        style="width: 70%; margin-bottom: 20px"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
        >
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAllPermission } from '@/api/permission.js'
import { watchLangSwitch } from '@/utils/i18n.js'
const allPermission = ref([])
const getPermission = async () => {
  allPermission.value = await getAllPermission()
}
getPermission()
watchLangSwitch(getPermission)
</script>

<style lang="scss" scoped></style>
