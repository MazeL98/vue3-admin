<!--  -->
<template>
  <div class="sidebar">
    <div class="logo-container">
      <img src="@/assets/img/M.png" class="logo" />
      <div v-if="$store.getters.sidebarOpened" class="logo-title">
        MazeL-Admin
      </div>
    </div>
    <el-scrollbar>
      <el-menu
        :unique-opened="true"
        :background-color="$store.getters.mainColor"
        :text-color="$store.getters.cssVar.menuText"
        :active-text-color="$store.getters.cssVar.menuActiveText"
        :collapse="!$store.getters.sidebarOpened"
        router
        :default-active="activeItem"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :route="route"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRoutes, generateRoutes } from '@/utils/modifyRoute.js'
const router = useRouter()
const routes = computed(() => {
  const filteredRoutes = filterRoutes(router.getRoutes())
  return generateRoutes(filteredRoutes)
})

const route = useRoute()
const activeItem = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped>
@import '@/styles/sidebar.scss';

.logo-container {
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0 30px;
}
.logo {
  width: 30px;
  height: 30px;
}

.logo-title {
  margin-left: 15px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  white-space: nowrap;
}
</style>
