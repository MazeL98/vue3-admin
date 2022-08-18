<!--  -->
<template>
  <div class="my-task-container">
    <el-card>
      <template #header>
        <span class="task-title">{{ $t('msg.profile.taskTitle') }}</span>
        <span class="new-task-btn">{{ $t('msg.profile.newBtn') }}</span>
      </template>
      <div class="task-item" v-for="item in myTasks" :key="item.date">
        <div class="date">
          {{ $filters.dateFilter(item.date, 'YYYY/MM/DD') }}
        </div>
        <div class="task-content" v-for="task in item.tasks" :key="task.desc">
          <div class="task-left">
            <el-checkbox
              v-model="task.isCompleted"
              :label="task.title"
            ></el-checkbox>
            <div class="task-desc" :class="{ isChecked: task.isCompleted }">
              {{ task.desc }}
            </div>
          </div>
          <svg-icon icon="task-more" class="more-action"></svg-icon>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const myTasks = computed(() => {
  return store.getters.userInfo.myTasks
})
const mainColor = computed(() => {
  return store.getters.mainColor
})
// const activeName = ref('active')
</script>

<style lang="scss" scoped>
.my-task-container {
  ::v-deep(.el-card__header) {
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 30px 0px;
    border-bottom: 0;
  }
  ::v-deep(.el-card__body) {
    padding: 0 30px 20px;
  }
  .task-title {
    vertical-align: middle;
    font-size: 24px;
    font-family: 'Lato';
    font-weight: bold;
  }

  .new-task-btn {
    background-color: v-bind(mainColor);
    border-radius: 14px;
    padding: 2px 9px 4px 9px;
    font-family: 'Lato';
    font-size: 14px;
    font-weight: normal;
    color: white;
  }

  .task-item {
    padding: 10px 0 25px;
    border-bottom: 1px solid #f1f1f1;
    .date {
      font-size: 20px;
      font-weight: bold;
      font-family: 'Lato';
      margin: 25px 0 25px;
    }
  }
}

.task-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;

  .task-left {
    display: flex;
    align-items: center;
  }

  ::v-deep(.el-checkbox) {
    margin-top: 3px;
  }
  ::v-deep(.el-checkbox__label) {
    font-size: 14px;
    font-weight: bold;
    padding-left: 15px;
  }

  ::v-deep(.el-checkbox__inner) {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    &::after {
      height: 9px;
      width: 5px;
      left: 5px;
      top: 2px;
    }
  }

  .task-desc {
    font-size: 14px;
    color: #949494;
    margin-left: 25px;
  }
  .more-action {
    cursor: pointer;
  }
  ::v-deep(.svg-icon) {
    width: 12px;
    height: 12px;
  }
}

.isChecked {
  text-decoration: line-through;
}
</style>
