<template>
  <div class="">
    <el-dialog
      :title="$t('msg.excel.roleDialogTitle')"
      :model-value="modelValue"
      @close="closed"
    >
      <el-checkbox-group v-model="staffRoles">
        <el-checkbox
          v-for="item in allRoles"
          :key="item.id"
          :label="item.title"
        ></el-checkbox>
      </el-checkbox-group>
      <template #footer>
        <span class="footer-button">
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
import { ref, watch, defineProps, defineEmits } from 'vue'
import { getRoleList, getStaffRoles, updateRole } from '@/api/role.js'
import { watchLangSwitch } from '@/utils/i18n.js'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  staffId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const closed = () => {
  emits('update:modelValue', false)
}

const i18n = useI18n()
const onConfirm = async () => {
  // checkbox绑定数据处理成后台需要的形式
  const roles = staffRoles.value.map((title) => {
    return allRoles.value.find((role) => role.title === title)
  })
  const rolesObj = {}
  roles.forEach((role) => {
    rolesObj[role.id] = role.title
  })
  await updateRole(props.staffId, rolesObj)
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  // 通知父组件，更新列表信息
  emits('updateRole')
  closed()
}

// 先获取所有角色列表
const allRoles = ref([])
const getAllRoles = async () => {
  allRoles.value = await getRoleList()
}
getAllRoles()
watchLangSwitch(getAllRoles)

// 获取当前员工的角色
const staffRoles = ref([])
const getStaffRolesList = async () => {
  const res = await getStaffRoles(props.staffId)
  staffRoles.value = Object.values(res)
}

watch(
  () => props.staffId,
  (val) => {
    if (val) getStaffRolesList()
  }
)
</script>

<style lang="scss" scoped></style>
