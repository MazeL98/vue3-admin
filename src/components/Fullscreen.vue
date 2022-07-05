<!--  -->
<template>
  <div @click="onToggle">
    <svg-icon
      id="guide-full"
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
      className="fullscreen-icon"
    ></svg-icon>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'
const isFullscreen = ref(false)
const onToggle = () => {
  screenfull.toggle()
}

onMounted(() => {
  screenfull.on('change', FullscreenChange)
})

onUnmounted(() => {
  screenfull.off('change', FullscreenChange)
})

const FullscreenChange = () => {
  isFullscreen.value = screenfull.isFullscreen
}
</script>

<style lang="scss" scoped></style>
