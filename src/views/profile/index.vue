<!--  -->
<template>
  <div class="profile-container">
    <el-row>
      <el-col :span="6">
        <project-card :feature="featureData"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card class="profile-card">
          <el-tabs v-model="activeName" class="profile-tabs">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :feature="featureData"></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter></chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author></author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/Feature.vue'
import Chapter from './components/Chapter.vue'
import Author from './components/Author.vue'
import { getFeature } from '@/api/app.js'
import { watchLangSwitch } from '@/utils/i18n.js'
// 默认标签页
const activeName = ref('feature')

// 获取接口数据
const featureData = ref([])
const getFeatureData = async () => {
  featureData.value = await getFeature()
}
getFeatureData()

// 监听语言变化重新获取数据
watchLangSwitch(getFeatureData)
</script>

<style lang="scss" scoped></style>
