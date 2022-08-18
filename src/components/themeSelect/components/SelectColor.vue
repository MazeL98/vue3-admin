<!--  -->
<template>
  <el-dialog
    :title="$t('msg.theme.themeColorChange')"
    :model-value="modelValue"
    width="40%"
    @close="closed"
  >
    <!-- <div class="title">{{ $t('msg.theme.themeColorChange') }}</div> -->
    <el-color-picker
      v-model="mColor"
      :predefine="predefineColors"
    ></el-color-picker>
    <div class="theme-tip" @click="handleDefault">
      {{ $t('msg.theme.themeTip') }}
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="confirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme.js'
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])
// 触发的关闭函数，同时要通知父组件
const closed = () => {
  emits('update:modelValue', false)
}

const store = useStore()
// 设置初始色值
const mColor = ref(store.getters.mainColor)
// 点击确定后触发confirm 函数
const confirm = async () => {
  // 将选中的色值本地缓存
  const newStyle = await generateNewStyle(mColor.value)
  writeNewStyle(newStyle)
  store.commit('theme/setMainColor', mColor.value)
  // 关闭对话框
  closed()
}

const predefineColors = [
  '#205072',
  '#ED784A',
  '#7D6C46',
  '#4A593D',
  '#405B55',
  '#08192D',
  '#3C2F41',
  '#64363C',
  '#007c66',
  '#565959',
  '#00667F',
  '#5960a8',
  '#609191'
]

const handleDefault = async () => {
  // 将选中的色值本地缓存
  mColor.value = '#304156'
  const newStyle = await generateNewStyle('#304156')
  writeNewStyle(newStyle)
  store.commit('theme/setMainColor', '#304156')
  // 关闭对话框
  closed()
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.theme-tip {
  cursor: pointer;
  margin-top: 20px;
  font-size: 12px;
  line-height: 20px;
  &:hover {
    color: #a6a9ad;
  }
}
</style>
