<!--  -->
<template>
  <div class="guide-container">
    <svg-icon
      id="guide-start"
      icon="guide"
      className="guide-icon"
      @click="startGuide"
    ></svg-icon>
  </div>
</template>

<script setup>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import steps from './steps'

const i18n = useI18n()
// 初始化 driver.js
let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
})

const startGuide = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style lang="scss" scoped></style>
