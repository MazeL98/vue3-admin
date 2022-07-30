import * as echarts from 'echarts'
const option = {
  title: {
    text: '% of Income Budget',
    textAlign: 'left',
    top: 10,
    left: 10
  },
  legend: {
    show: true,
    data: [{ name: 'balance', icon: 'circle' }],
    left: 15,
    bottom: 10
  },

  series: [
    {
      type: 'gauge',
      radius: '55%',
      name: 'balance',
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
          value: 64, // 后台返回的数据
          name: 'Budget' // 根据后台数据定义名称（优，良）
        }
      ]
    }
  ]
}

export default option
