<!--  -->
<template>
  <div>
    <el-dropdown trigger="click" @command="handleLanguageSelect">
      <div>
        <svg-icon
          id="guide-lang"
          icon="language"
          className="language-icon"
        ></svg-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh" :disabled="language === 'zh'">
            中文</el-dropdown-item
          >
          <el-dropdown-item command="en" :disabled="language === 'en'">
            English
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})

const store = useStore()
const i18n = useI18n()
const handleLanguageSelect = (command) => {
  i18n.locale.value = command
  store.commit('app/setLanguage', command)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
const language = computed(() => store.getters.language)
</script>

<style lang="scss" scoped></style>
