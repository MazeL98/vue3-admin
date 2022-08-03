<!--  -->
<template>
  <div class="">
    <el-dropdown trigger="click" @command="handleThemeSelect">
      <div>
        <svg-icon
          id="guide-theme"
          icon="change_theme"
          className="theme-change-icon"
        ></svg-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="color">{{
            $t('msg.theme.themeColorChange')
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="select-color-container">
      <select-color v-model="openSelectColor"></select-color>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'
const openSelectColor = ref(false)
const handleThemeSelect = () => {
  openSelectColor.value = true
}
</script>

<style lang="scss" scoped>
.select-color-container {
  ::v-deep(.el-dialog) {
    z-index: 999;
  }
}
</style>
