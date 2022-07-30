<!--  -->
<template>
  <div id="gauge" ref="gaugeRef"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import option from './customOption'
const gaugeRef = ref(null)
let gaugeChart

const echartInit = () => {
  gaugeChart = echarts.init(gaugeRef.value, null, {
    renderer: 'canvas',
    useDirtyRect: false
  })
  if (option && typeof option === 'object') {
    gaugeChart.setOption(option)
  }
}
onMounted(() => {
  echartInit()
})
</script>

<style lang="scss" scoped>
#gauge {
  width: 100%;
  height: calc(40vh - 50px);
}
</style>
