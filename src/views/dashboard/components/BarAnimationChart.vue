<!--  -->
<template>
  <div class="bar-animation-box" ref="barAnimationRef"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
const barAnimationRef = ref(null)
let barAnimationChart

const resizeChart = () => {
  window.addEventListener('resize', () => {
    barAnimationChart.resize()
  })
}

const xAxisData = []
const data1 = []
const data2 = []
for (let i = 0; i < 90; i++) {
  xAxisData.push('A' + i)
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
}
console.log(data1)
const echartInit = () => {
  barAnimationChart = echarts.init(barAnimationRef.value)
  const option = {
    title: {
      text: '近期收益'
    },
    legend: {
      data: ['交易', '订单']
    },
    grid: {
      bottom: 0,
      top: 25,
      left: 10,
      right: 10
    },
    toolbox: {
      // y: 'bottom',
      feature: {
        magicType: {
          type: ['stack']
        },
        saveAsImage: {
          pixelRatio: 2
        }
      }
    },
    tooltip: {
      valueFormatter: (value) => value.toFixed(0) + '万'
    },
    xAxis: {
      data: xAxisData,
      splitLine: {
        show: false
      },
      show: false
    },
    yAxis: {
      show: false
    },
    series: [
      {
        name: '交易',
        type: 'bar',
        data: data1,
        emphasis: {
          focus: 'series'
        },
        animationDelay: function (idx) {
          return idx * 10
        }
      },
      {
        name: '订单',
        type: 'bar',
        data: data2,
        emphasis: {
          focus: 'series'
        },
        animationDelay: function (idx) {
          return idx * 10 + 100
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: function (idx) {
      return idx * 5
    }
  }
  barAnimationChart.setOption(option)
  resizeChart()
}
onMounted(() => {
  echartInit()
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    barAnimationChart.resize()
  })
})
</script>

<style lang="scss" scoped>
// 使用 resize 容器的宽高不能写死
.bar-animation-box {
  width: 100%;
  height: 30vh;
}
</style>
