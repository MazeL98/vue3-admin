<!--  -->
<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="summary">
          <div class="left">
            <svg-icon icon="profit" className="summary-icon"></svg-icon>
          </div>
          <div class="right">
            <div class="summary-title">累计收益 <span>（万元）</span></div>
            <span class="summary-amount">154,346</span>
          </div>
        </el-card>
        <el-card class="today-account">
          <div
            class="profit-item"
            v-for="(item, index) in profitList"
            :key="index"
          >
            <div class="item-title">{{ item.title }} <span>(万元)</span></div>
            <div class="item-content">
              {{ item.amount }}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8"> <el-card>1</el-card> </el-col>
      <el-col :span="8">
        <el-card> <bar-animation-chart></bar-animation-chart> </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BarAnimationChart from './components/BarAnimationChart.vue'
import { useStore } from 'vuex'
const profitList = ref([
  { title: '今日收益', amount: 547.1 },
  { title: '今日支出', amount: 472.4 },
  { title: '今日结余', amount: 302.4 }
])
const store = useStore()
const iconColor = ref(store.getters.mainColor)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.dashboard-container {
  .summary {
    margin-bottom: 10px;
    &:hover {
      cursor: pointer;
      & .left {
        background-color: v-bind(iconColor);
        ::v-deep .summary-icon {
          fill: rgba(255, 255, 255, 0.9);
        }
      }
    }
    ::v-deep .el-card__body {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 10px 20px;
    }
    .left {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 2;
      height: 80px;
      border-radius: 5px;

      ::v-deep .summary-icon {
        width: 40px;
        height: 40px;
        fill: v-bind(iconColor);
      }
    }
    .right {
      flex: 3;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 30px;
      margin-left: 30px;
      .summary-title {
        font-size: 14px;
        font-weight: 800;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 7px;
        span {
          font-size: 14px;
        }
      }
      .summary-amount {
        font-size: 28px;
        font-weight: 600;
        margin-left: -2px;
      }
    }
  }
  .today-account {
    .profit-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      margin: 0 0 0 20px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);

      & .item-title {
        flex: 2;
        border-left: 6px solid v-bind(iconColor);
        padding: 3px 0 3px 10px;
        font-size: 12px;
      }

      & .item-content {
        flex: 3;
        font-size: 24px;
        font-weight: 600;
        padding-left: 25px;
      }
    }
  }
}
</style>
