<template>
  <div class="app-wrapper" :class="toggleSidebarWidth()">
    <!-- 侧边栏 -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.mainColor }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <navbar></navbar>
        <tags-view id="guide-tags"></tags-view>
      </div>
      <app-main class="app-main" />
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import Sidebar from './components/sidebar/index.vue'
import Navbar from './components/Navbar.vue'
import TagsView from '@/components/tagsView/TagsView.vue'
import AppMain from './components/AppMain.vue'
// 引入scss 变量

import { useStore } from 'vuex'
const store = useStore()
const toggleSidebarWidth = () => {
  if (!store.getters.sidebarOpened) {
    return ['collapsedSidebar']
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
@import '@/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.sidebar-container {
  transition: width #{$sidebarDuration};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: hidden;
  width: $sidebarWidth;
  height: 100%;
  z-index: 1111;
}

.collapsedSidebar {
  .sidebar-container {
    width: 64px !important;
  }

  .fixed-header {
    left: $collapseSidebarWidth !important;
  }

  .main-container {
    margin-left: $collapseSidebarWidth !important;
  }
}

.main-container {
  transition: margin-left #{$sidebarDuration};
  margin-left: $sidebarWidth;
  position: relative;
}

.fixed-header {
  // position: fixed;
  // top: 0;
  // right: 0;
  left: $sidebarWidth;
  transition: left #{$sidebarDuration};
}

.app-main {
  width: 100%;
  min-height: calc(100vh - 85px);
  overflow: hidden;
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
