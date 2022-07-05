<!--  -->
<template>
  <div class="">
    <el-card class="print-button-box">
      <el-button type="primary" :loading="printLoading">{{
        $t('msg.staffInfo.print')
      }}</el-button>
    </el-card>
    <el-card id="staffInfoBox" class="staff-info-box" v-print="printObj">
      <div class="info-title">
        <h2 style="text-align: center">{{ $t('msg.staffInfo.title') }}</h2>
      </div>
      <div class="header">
        <el-descriptions :column="2" border>
          <el-descriptions-item :label="$t('msg.staffInfo.name')">{{
            staffInfo.username
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('msg.staffInfo.sex')">{{
            staffInfo.gender
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('msg.staffInfo.nation')">{{
            staffInfo.nationality
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('msg.staffInfo.mobile')">{{
            staffInfo.mobile
          }}</el-descriptions-item>
          <el-descriptions-item
            :label="$t('msg.staffInfo.province')"
            >{{
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('msg.staffInfo.date')">{{
            $filters.dateFilter(staffInfo.openTime)
          }}</el-descriptions-item>
          <el-descriptions-item :label="$t('msg.staffInfo.remark')" :span="2">
            <el-tag
              class="remark"
              size="small"
              v-for="(item, index) in staffInfo.remark"
              :key="index"
              >{{ item }}</el-tag
            >
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.staffInfo.address')" :span="2">
            {{ staffInfo.address }}
          </el-descriptions-item>
        </el-descriptions>
        <div class="avatar">
          <el-image
            :src="staffInfo.avatar"
            :preview-src-list="[staffInfo.avatar]"
          ></el-image>
        </div>
      </div>
      <div class="body">
        <el-descriptions direction="vertical" :column="1" border>
          <el-descriptions-item :label="$t('msg.staffInfo.experience')">
            <ul>
              <li v-for="(item, index) in staffInfo.experience" :key="index">
                <span>
                  {{ $filters.dateFilter(item.startTime, 'YYYY/MM') }}
                  ----
                  {{ $filters.dateFilter(item.endTime, 'YYYY/MM') }}</span
                >
                <span>{{ item.title }}</span>
                <span>{{ item.desc }}</span>
              </li>
            </ul>
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.staffInfo.major')">
            {{ staffInfo.major }}
          </el-descriptions-item>
          <el-descriptions-item :label="$t('msg.staffInfo.glory')">
            {{ staffInfo.prize }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="footer">{{ $t('msg.staffInfo.foot') }}</div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getStaffInfo } from '@/api/staff-manage.js'
import { useRoute } from 'vue-router'
const route = useRoute()
const staffInfo = ref({})
const getData = async () => {
  staffInfo.value = await getStaffInfo(route.params.id)
}
getData()

// 创建打印对象
const printLoading = ref(false)
const printObj = {
  id: 'staffInfoBox',
  popTitle: 'mazel-admin',
  beforeOpenCallback(vue) {
    printLoading.value = true
  },
  openCallback(vue) {
    printLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.print-button-box {
  margin-bottom: 20px;
  text-align: right;
}

.staff-info-box {
  width: 1024px;
  margin: 0 auto;
  .info-title {
    margin-bottom: 18px;
  }
  .header {
    display: flex;
    ::v-deep .el-descriptions {
      flex-grow: 1;
    }
    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }
    .remark {
      margin-right: 10px;
    }
  }
  .body {
    ul {
      list-style: none;
      li {
        span {
          margin-right: 62px;
        }
      }
    }
  }
  .footer {
    margin-top: 40px;
    text-align: right;
  }
}
</style>
