<!--  -->
<template>
  <div class="profile-container">
    <el-row>
      <el-col :span="6" class="left-col">
        <user-info></user-info>
        <meeting></meeting>
      </el-col>
      <el-col :span="12" class="mid-col">
        <my-task></my-task>
      </el-col>
      <el-col :span="6">
        <project></project>
        <member></member>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {} from 'vue'
import UserInfo from './components/UserInfo.vue'
import MyTask from './components/MyTask.vue'
import Project from './components/Project.vue'
import Meeting from './components/Meeting.vue'
import Member from './components/Member.vue'
</script>

<style lang="scss" scoped>
.left-col,
.mid-col {
  padding-right: 20px;
}
</style>
