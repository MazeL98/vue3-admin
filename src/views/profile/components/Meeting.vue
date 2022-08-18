<!--  -->
<template>
  <div class="meeting-container">
    <el-card>
      <template #header>
        <span class="meeting-title">{{ $t('msg.profile.meetingTitle') }}</span>
        <span class="new-meeting-btn">{{ $t('msg.profile.newBtn') }}</span>
      </template>
      <el-card class="meeting-item">
        <div class="left">
          <el-avatar
            shape="circle"
            :size="40"
            src="http://rfsjnlrct.hn-bkt.clouddn.com/zoom-transparent.png"
          ></el-avatar>
        </div>
        <div class="right">
          <div class="topic">周会</div>
          <div class="more">
            <svg-icon icon="meeting-more"></svg-icon>
          </div>
          <div class="content">
            <div class="time">今天 10:30</div>
            <div class="member">
              <el-avatar
                shape="circle"
                :size="25"
                src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
                fit="contain"
              ></el-avatar>
              <el-avatar
                shape="circle"
                :size="25"
                class="member-item"
                src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
                fit="cover"
              ></el-avatar>
              <el-avatar
                shape="circle"
                :size="25"
                class="member-item"
                src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
                fit="cover"
              ></el-avatar>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="meeting-item">
        <div class="left">
          <el-avatar
            shape="circle"
            :size="40"
            src="http://rfsjnlrct.hn-bkt.clouddn.com/zoom-transparent.png"
          ></el-avatar>
        </div>
        <div class="right">
          <div class="topic">X项目需求会议</div>
          <div class="more">
            <svg-icon icon="meeting-more"></svg-icon>
          </div>
          <div class="content">
            <div class="time">明天 17:00</div>
            <div class="member">
              <el-avatar
                shape="circle"
                :size="25"
                src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
                fit="contain"
              ></el-avatar>
              <el-avatar
                shape="circle"
                :size="25"
                class="member-item"
                src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
                fit="cover"
              ></el-avatar>
              <el-avatar
                shape="circle"
                :size="25"
                class="member-item"
                src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
                fit="cover"
              ></el-avatar>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="meeting-item">
        <div class="left">
          <el-avatar
            shape="circle"
            :size="40"
            src="http://rfsjnlrct.hn-bkt.clouddn.com/zoom-transparent.png"
          ></el-avatar>
        </div>
        <div class="right">
          <div class="topic">Y项目总结会</div>
          <div class="more">
            <svg-icon icon="meeting-more"></svg-icon>
          </div>
          <div class="content">
            <div class="time">明天 19:30</div>
            <div class="member">
              <el-avatar
                shape="circle"
                :size="25"
                src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
                fit="contain"
              ></el-avatar>
              <el-avatar
                shape="circle"
                :size="25"
                class="member-item"
                src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
                fit="cover"
              ></el-avatar>
              <el-avatar
                shape="circle"
                :size="25"
                class="member-item"
                src="http://rfsjnlrct.hn-bkt.clouddn.com/avatar.png"
                fit="cover"
              ></el-avatar>
            </div>
          </div>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const mainColor = computed(() => {
  return store.getters.mainColor
})
</script>

<style lang="scss" scoped>
.meeting-container {
  margin-top: 15px;
  ::v-deep(.el-card__header) {
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0;
  }
  ::v-deep(.el-card) {
    background-color: #f6f7f9;
  }
  .meeting-title {
    vertical-align: middle;
    font-size: 24px;
    font-family: 'Lato';
    font-weight: bold;
  }

  .new-meeting-btn {
    background-color: v-bind(mainColor);
    border-radius: 14px;
    padding: 2px 9px 4px 9px;
    font-family: 'Lato';
    font-size: 14px;
    font-weight: normal;
    color: #fff;
  }
}

.meeting-item {
  box-shadow: 1px 1px 2px 1px rgba(156, 156, 156, 0.1) !important;
  border-radius: 0 !important;
  border: 0 !important;
  margin-bottom: 20px;

  ::v-deep(.el-card__body) {
    display: flex;
    padding: 15px;
    padding-bottom: 10px;
    background-color: #fff;
  }
  .left {
    ::v-deep(.el-avatar) {
      background-color: v-bind(mainColor);
    }
  }
  .right {
    flex: 1;
    position: relative;
    margin-left: 15px;
    .topic {
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
    }
    .more {
      position: absolute;
      right: 0px;
      display: inline-block;
      cursor: pointer;
    }
  }
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
  margin-right: -4px;
  .time {
    font-size: 12px;
    color: #aeb3bc;
  }
  ::v-deep(.el-avatar) {
    margin-left: -10px;
    border: 1.5px solid #fff;
  }
}
</style>
