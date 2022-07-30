<!--  -->
<template>
  <div class="">
    <div class="bar-chart-box" id="bar" ref="barChartRef"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue'
import * as echarts from 'echarts'
import { useI18n } from 'vue-i18n'
import { watchLangSwitch } from '@/utils/i18n.js'

const props = defineProps({
  barChartData: {
    type: Array,
    required: true
  }
})

const i18n = useI18n()
const barChartRef = ref(null)
let barChart
const option = {
  title: {
    text: i18n.t('msg.dashboard.barChartTitle')
  },
  color: ['#56C596', '#329D9C', '#205072'],

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    valueFormatter: (value) => value.toFixed(0) + ' （万元）'
  },
  legend: {
    // data: ['Profit', 'Expenses', 'Income'],
    formatter: '{name}' + ' (' + i18n.t('msg.dashboard.measurement') + ')',
    right: 20
  },
  grid: {
    left: '60'
  },
  xAxis: [
    {
      type: 'value'
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: {
        show: false
      },
      data: ['21点', '18点', '15点', '12点', '9点', '6点', '3点', '0点']
    }
  ],
  series: [
    {
      name: i18n.t('msg.dashboard.income'),
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'right'
      },
      emphasis: {
        focus: 'series'
      },
      data: props.barChartData.map((item) => item.income).reverse()
    },
    {
      name: i18n.t('msg.dashboard.expense'),
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'right'
      },
      emphasis: {
        focus: 'series'
      },
      data: props.barChartData.map((item) => item.expense).reverse()
    },
    {
      name: i18n.t('msg.dashboard.balance'),
      type: 'bar',
      label: {
        show: true,
        position: 'inside'
      },
      emphasis: {
        focus: 'series'
      },
      data: props.barChartData.map((item) => item.balance).reverse()
    }
  ]
}

const echartInit = () => {
  barChart = echarts.init(barChartRef.value)
  option && barChart.setOption(option)
}
onMounted(() => {
  echartInit()
})

watch(
  () => props.barChartData,
  () => {
    option.series[0].data = props.barChartData
      .map((item) => item.income)
      .reverse()
    option.series[1].data = props.barChartData
      .map((item) => item.expense)
      .reverse()
    option.series[2].data = props.barChartData
      .map((item) => item.balance)
      .reverse()
    barChart.setOption(option)
  }
)
watchLangSwitch(() => {
  option.title.text = i18n.t('msg.dashboard.barChartTitle')
  option.legend.formatter =
    '{name}' + ' (' + i18n.t('msg.dashboard.measurement') + ')'
  option.series[0].name = i18n.t('msg.dashboard.income')
  option.series[1].name = i18n.t('msg.dashboard.expense')
  option.series[2].name = i18n.t('msg.dashboard.balance')
  barChart.setOption(option)
})
</script>

<style lang="scss" scoped>
.bar-chart-box {
  width: 100%;
  height: 55vh;
}
</style>
