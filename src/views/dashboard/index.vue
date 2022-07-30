<!--  -->
<template>
  <div class="dashboard-container">
    <div class="overview-box">
      <div class="left">
        <!-- <svg-icon icon="profit" className="summary-icon"></svg-icon> -->
        <div class="overview">
          <div class="overview-amount">{{ overviewList.monthly }}</div>
          <div class="overview-title">
            {{ $t('msg.dashboard.monthly') }}
            <span>({{ $t('msg.dashboard.measurement') }})</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div
          class="monitor-item"
          v-for="(value, key) in overviewList.monitorList"
          :key="key"
        >
          <div class="item-title">
            {{ $t(`msg.dashboard.${key}`) }}
            <span>({{ $t('msg.dashboard.measurement') }})</span>
          </div>
          <bar-animation class="bar-animation"></bar-animation>
          <div class="item-content">{{ value }}</div>
        </div>
      </div>
    </div>
    <el-row :gutter="20" class="row-container">
      <el-col :span="18">
        <el-card>
          <line-chart v-if="trendList" :lineData="trendList"></line-chart>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <gauge></gauge>
          <div class="view-more">View More</div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="row-container">
      <el-col :span="16">
        <el-card class="bar-chart-container">
          <bar-chart
            v-if="TimePointData"
            :barChartData="TimePointData"
          ></bar-chart>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="calendar-container">
          <el-calendar v-if="calendarList" class="calendar">
            <template #dateCell="{ data }">
              <p :class="getBgColor(data)" @click="onCalendarClick(data.day)">
                <span class="date-number">{{
                  data.day.split('-').slice(2).join('-')
                }}</span>
                <span class="day-balance">{{ dayBalance(data.day) }}</span>
              </p>
            </template>
          </el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BarAnimation from '@/components/BarAnimation.vue'
import Gauge from './components/Gauge.vue'
import LineChart from './components/LineChart.vue'
import BarChart from './components/BarChart.vue'
import dayjs from 'dayjs'
import {
  getOverview,
  getTrend,
  getCalendar,
  getTimePoint
} from '@/api/chart.js'

// 请求 overview 部分的数据
const overviewList = ref([])
const today = dayjs().format('YYYY-MM-DD')
const getOverviewList = async () => {
  const { monthly, todayIncome, todayExpense, todayBalance } =
    await getOverview({ date: today })
  overviewList.value = {
    monthly: monthly,
    monitorList: { todayIncome, todayExpense, todayBalance }
  }
}
getOverviewList()
// 请求折线图数据
const trendList = ref(null)
const getTrendList = async () => {
  trendList.value = await getTrend({ date: today })
  trendList.value.weekIncome.reverse()
  trendList.value.weekExpense.reverse()
}
getTrendList()
onMounted(() => {
  getTimePointData(today)
})

// 请求日历数据
const calendarList = ref(null)
const getCalendarList = async () => {
  calendarList.value = await getCalendar()
  calendarList.value.forEach((item) => {
    const arr = Object.values(item)
    item[arr[0]] = arr[1]
  })
}
getCalendarList()
// 在日历上显示该日结余
const dayBalance = computed((date) => {
  return function (date) {
    if (calendarList.value) {
      const res = calendarList.value.find((item) => item.date === date)
      if (res) {
        return res.totalBalance
      } else {
        return ''
      }
    }
  }
})
// 给日历加上不同样式
const getBgColor = (data) => {
  if (data.isSelected) {
    return 'is-selected'
  }
  if (dayBalance.value(data.day) > 0) {
    return 'profit'
  } else if (dayBalance.value(data.day) < 0) {
    return 'deficit'
  } else {
    return ''
  }
}

// 请求正负柱状图数据
const TimePointData = ref(null)
const getTimePointData = async (date) => {
  TimePointData.value = await getTimePoint({ date: date })
}
// 监听日历点击事件
const onCalendarClick = (date) => {
  getTimePointData(date)
  console.log('点击日历')
  console.log(date)
}
</script>

<style lang="scss" scoped>
// Overview 模块
.overview-box {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  height: 100px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
  color: #494949;

  .left {
    display: flex;
    margin: 20px 0 0 20px;

    .overview {
      margin-left: 10px;
      .overview-title {
        font-size: 14px;
        color: #818181;
      }
      .overview-amount {
        font-size: 34px;
        font-weight: 600;
      }
    }
  }
  .right {
    display: flex;
  }
}

.monitor-item {
  margin: 20px 0px;
  padding: 0 25px;
  border-right: 1px solid #ececec;
  text-align: right;

  .item-title {
    display: inline-block;
    font-size: 14px;
    color: #818181;
    margin-right: 12px;
  }
  .item-content {
    margin-top: 5px;
    font-size: 22px;
    font-weight: bold;
    margin-right: -2px;
  }
}
.bar-animation {
  display: inline-block;
  padding-top: 4px;
  vertical-align: top;
}

// Gauge 图表
.view-more {
  box-sizing: border-box;
  height: 50px;
  border-top: 1px solid #f3f3f4;
  padding: 15px 0;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  color: #494949;
  cursor: pointer;
}

// 整体布局
.dashboard-container {
  .el-card {
    ::v-deep .el-card__body {
      padding-top: 20px;
    }
  }
  .row-container {
    margin-bottom: 20px;
  }
}

// 日历
.calendar-container {
  height: 57vh;

  .calendar {
    ::v-deep .el-calendar-day {
      padding: 0px;
      height: 60px !important;
      p {
        height: 100%;
        span {
          display: block;
          padding-left: 5px;
          padding-top: 7px;
        }
        .day-balance {
          font-size: 12px;
        }
      }
      .profit {
        background-color: #f3fff3;
        & .day-balance {
          color: #56c596;
        }
        &:hover {
          background-color: #d6f2ff;
        }
      }
      .deficit {
        background-color: #ffe7e7;
        & .day-balance {
          color: #f29292;
        }
        &:hover {
          background-color: #d6f2ff;
        }
      }
      .is-selected {
        background-color: #d6f2ff;
      }
    }
    ::v-deep .el-calendar__body {
      padding: 0;
    }
    ::v-deep .el-calendar__header {
      padding-left: 0;
      padding-right: 0;
    }
    // // 隐藏日历中的下个月份
    // ::v-deep .el-calendar-table:not(.is-range) td.prev {
    //   visibility: hidden;
    // }
    // ::v-deep .el-calendar-table:not(.is-range) td.next {
    //   visibility: hidden;
    // }
    // ::v-deep .prev > .el-calendar-day > p {
    //   display: none;
    // }
    // ::v-deep .next > .el-calendar-day > p {
    //   display: none;
    // }
  }
}

// 正负柱状图
.bar-chart-container {
  height: 57vh;
  ::v-deep .el-card__body {
    padding: 0 20px;
  }
}
</style>
