<!--  -->
<template>
  <div class="project-container">
    <el-card>
      <template #header>
        <span class="project-title">{{ $t('msg.profile.projectTitle') }}</span>
      </template>
      <div class="project-overview">
        <el-card class="project-item">
          <div class="completed">
            <div class="left">
              <svg-icon icon="completed"></svg-icon>
            </div>
            <div class="right">
              <div class="completed-title">
                {{ $t('msg.profile.completed') }}
              </div>
              <div class="completed-content">5</div>
            </div>
          </div>
        </el-card>
        <el-card class="project-item">
          <div class="in-progress">
            <div class="left">
              <svg-icon icon="in_progress"></svg-icon>
            </div>
            <div class="right">
              <div class="in-progress-title">
                {{ $t('msg.profile.inProgress') }}
              </div>
              <div class="in-progress-content">3</div>
            </div>
          </div>
        </el-card>
      </div>
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
.project-container {
  .el-card {
    background-color: #f6f7f9;
  }
  ::v-deep(.el-card__header) {
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0;
    padding: 20px 20px 0px;
  }
  .project-title {
    vertical-align: middle;
    font-size: 24px;
    font-family: 'Lato';
    font-weight: bold;
  }

  ::v-deep(.el-card__body) {
    padding: 20px 20px 10px;
  }
}
.project-overview {
  display: flex;
  flex-direction: column;
  ::v-deep(.svg-icon) {
    width: 34px;
    height: 34px;
    fill: #fff;
  }
}
.completed,
.in-progress {
  display: flex;
  margin: 15px 0;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 55px;
    height: 55px;
    border-radius: 5px;
    background-color: v-bind(mainColor);
  }
  .right {
    flex: 1;
    margin-left: 20px;
    text-align: right;
    .completed-title,
    .in-progress-title {
      font-size: 14px;
      color: #949494;
    }
    .completed-content,
    .in-progress-content {
      font-size: 35px;
      font-weight: bold;
      font-family: 'Lato';
    }
  }
}

.project-item {
  box-shadow: 1px 1px 2px 1px rgba(156, 156, 156, 0.1) !important;
  border-radius: 0 !important;
  border: 0 !important;
  margin-bottom: 15px;
  ::v-deep(.el-card__body) {
    padding: 2px 20px;
    background-color: #fff;
  }
}
</style>
