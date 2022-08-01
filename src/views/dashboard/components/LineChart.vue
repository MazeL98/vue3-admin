<!--  -->
<template>
  <div>
    <div class="line-chart-box" id="line" ref="lineChartRef"></div>
  </div>
</template>

<script setup>
// import { defineProps } from 'vue'
import { ref, onMounted, defineProps } from 'vue'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
import { watchLangSwitch } from '@/utils/i18n.js'
const props = defineProps({
  lineData: {
    required: true
  }
})
const i18n = useI18n()
const lineChartRef = ref(null)
let lineChart
const option = {
  title: {
    text: i18n.t('msg.dashboard.lineChartTitle'),
    top: 5
  },
  color: ['#205072', '#56C596'],
  legend: {
    show: true,
    right: 30,
    align: 'right',
    icon: 'circle',
    formatter: '{name}' + ' (' + i18n.t('msg.dashboard.measurement') + ')'
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    valueFormatter: (value) =>
      value.toFixed(0) + i18n.t('msg.dashboard.measurement')
  },
  xAxis: {
    type: 'category',
    data: ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7'],
    axisPointer: {
      label: {
        show: true
      }
    }
  },
  yAxis: {
    type: 'value',
    min: 20,
    max: 90
  },
  axisPointer: {
    show: true,
    type: 'line',
    snap: true,
    lineStyle: {
      type: 'solid'
    }
  },
  grid: {
    show: true
  },
  series: [
    {
      name: i18n.t('msg.dashboard.income'),
      data: props.lineData.weekIncome,
      type: 'line',
      smooth: true
    },
    {
      name: i18n.t('msg.dashboard.expense'),
      data: props.lineData.weekExpense,
      type: 'line',
      smooth: true
    }
  ]
}
const echartInit = () => {
  lineChart = echarts.init(lineChartRef.value)
  option && lineChart.setOption(option)
}
onMounted(() => {
  echartInit()
})
watchLangSwitch(() => {
  option.title.text = i18n.t('msg.dashboard.lineChartTitle')
  option.legend.formatter =
    '{name}' + ' (' + i18n.t('msg.dashboard.measurement') + ')'
  option.series[0].name = i18n.t('msg.dashboard.income')
  option.series[1].name = i18n.t('msg.dashboard.expense')
  lineChart.setOption(option)
})
</script>

<style lang="scss" scoped>
.line-chart-box {
  width: 100%;
  height: 40vh;
}
</style>
