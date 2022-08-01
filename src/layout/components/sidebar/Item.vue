<!--  -->
<template>
  <svg-icon :icon="icon"></svg-icon>
  <span :style="{ fontSize: titleSize }">
    {{ $t('msg.route.' + title) }}
  </span>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
const store = useStore()
const titleSize = computed(() => {
  if (store.getters.language === 'zh') {
    return '14px'
  } else {
    return '16px'
  }
})
</script>

<style lang="scss" scoped>
span {
  font-size: 16px;
  margin-left: 10px;
}
</style>
