<!--  -->
<template>
  <div class="">
    <el-dialog
      :title="$t('msg.excel.roleDialogTitle')"
      :model-value="modelValue"
      @close="closed"
    >
      <el-tree
        ref="treeRef"
        :data="allPermission"
        show-checkbox
        check-strictly
        node-key="id"
        default-expand-all
        :props="defaultProps"
      >
      </el-tree>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closed">{{
            $t('msg.universal.cancel')
          }}</el-button>
          <el-button type="primary" @click="onConfirm">{{
            $t('msg.universal.confirm')
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { getAllPermission } from '@/api/permission.js'
import { getRolePermission, distributePermission } from '@/api/role.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { watchLangSwitch } from '@/utils/i18n'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

// 获取所有权限列表
const allPermission = ref([])
const getAllPermissionList = async () => {
  allPermission.value = await getAllPermission()
}
getAllPermissionList()
// 渲染 el-tree
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// 获取指定角色的权限
const treeRef = ref(null)
const getPermissionList = async () => {
  const checkedKeys = await getRolePermission(props.roleId)
  // 利用 el-tree 的方法 setCheckedKeys，将角色对应的权限勾选上
  treeRef.value.setCheckedKeys(checkedKeys)
}
watchLangSwitch(getAllPermissionList, getPermissionList)

// 监听 props.roleId 变化，重新获取对应权限
watch(
  () => props.roleId,
  (val) => {
    if (val) {
      getPermissionList()
    }
  }
)

// 点击确认，更新权限并传给后台
const i18n = useI18n()
const onConfirm = async () => {
  // 调用分配权限的请求，把roleId和更新的permissionsKeys传给后台
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

// 关闭对话框
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
