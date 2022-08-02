<!--  -->
<template>
  <div id="gauge" ref="gaugeRef"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import { TitleComponent, LegendComponent } from 'echarts/components'
import { GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import option from './customOption'
echarts.use([TitleComponent, LegendComponent, GaugeChart, CanvasRenderer])

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
