<template>
  <!-- 展示外部图标 -->
  <!-- 要指定外部图标的style，以及类名 -->
  <div class="icon-wrapper">
    <div
      v-if="isExternal"
      :style="styleExternalIcon"
      class="svg-icon svg-external-icon"
      :class="className"
    ></div>
    <!-- 展示内部图标 -->
    <!-- 绑定该图标的类名，绑定组件传过来的自定义类名 -->
    <svg
      v-else
      class="svg-icon"
      :class="className"
      aria-hidden="true"
      v-bind="$attrs"
    >
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternal as external } from '@/utils/validate.js'
const props = defineProps({
  // icon图标
  icon: {
    type: String,
    required: true
  },
  // 自定义icon 类名
  className: {
    type: String,
    default: ''
  }
})

const isExternal = computed(() => external(props.icon))
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.icon-wrapper {
  display: inline-block;
}
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: #606266;
  overflow: hidden;
}

.svg-external-icon {
  display: inline-block;
  background-color: currentColor;
  mask-size: cover !important;
}
</style>
