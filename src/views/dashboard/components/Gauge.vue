<!--  -->
<template>
  <div id="gauge" ref="gaugeRef"></div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue'
// echarts.js 按需引入
import * as echarts from 'echarts/core'
import { TitleComponent, LegendComponent } from 'echarts/components'
import { GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useI18n } from 'vue-i18n'
import { watchLangSwitch } from '@/utils/i18n.js'
echarts.use([TitleComponent, LegendComponent, GaugeChart, CanvasRenderer])

const gaugeRef = ref(null)
let gaugeChart
const props = defineProps({
  income: {
    type: Number,
    required: true
  }
})

const i18n = useI18n()
const option = {
  title: {
    text: i18n.t('msg.dashboard.gaugeTitle'),
    textAlign: 'left',
    top: 10,
    left: 10
  },
  legend: {
    icon: 'circle',
    show: true,
    left: 15,
    bottom: 10
  },
  series: [
    {
      type: 'gauge',
      radius: '55%',
      name: i18n.t('msg.dashboard.gaugeLabel'),
      startAngle: 90,
      endAngle: -270,
      pointer: {
        show: false // 是否显示指针
      },
      progress: {
        show: true,
        roundCap: true,
        width: 15,
        clip: true
      },
      min: 0,
      max: 100,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          // { offset: 0.1, color: '#7BE495' },
          { offset: 0.1, color: '#56C596' },
          { offset: 1, color: '#329D9C' }
        ])
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          color: [[1, '#f3f3f4']],
          width: 15
        }
      },
      splitLine: {
        show: false // 是否显示分隔线。
      },
      clockwise: true, // 仪表盘刻度是否是顺时针增长。
      axisTick: false, // 是否显示刻度
      splitNumber: 1, // 分割线之间的刻度
      // 起始点和最终点距离设置
      axisLabel: {
        show: false
      },
      detail: {
        // 仪表盘文字。
        formatter: '{value}%',
        color: '#329D9C',
        fontSize: 26,
        offsetCenter: [0, '-5%']
        //  show : false //  title下面的文字（53）
      },
      title: {
        // 仪表盘标题。
        show: true,
        offsetCenter: [0, '25%'], //  title圆环中心的距离
        fontSize: 16,
        fontWeight: 'normal',
        color: '#a7a5ad'
      },
      data: [
        {
          value: props.income.toFixed(0), // 后台返回的数据
          name: i18n.t('msg.dashboard.gaugeContent')
        }
      ]
    }
  ]
}
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

watch(
  () => props.income,
  () => {
    option.series[0].data[0].value = props.income
  }
)
watchLangSwitch(() => {
  option.title.text = i18n.t('msg.dashboard.gaugeTitle')
  option.series[0].name = i18n.t('msg.dashboard.gaugeLabel')
  option.series[0].data[0].name = i18n.t('msg.dashboard.gaugeContent')
  gaugeChart.setOption(option)
})
</script>

<style lang="scss" scoped>
#gauge {
  width: 100%;
  height: calc(40vh - 50px);
}
</style>
