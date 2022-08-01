<!--  -->
<template>
  <div class="sidebar">
    <div class="logo-container">
      <img src="@/assets/img/M-logo.png" class="logo" />
      <div v-if="$store.getters.sidebarOpened" class="logo-title">
        Mazel-Admin
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
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400&display=swap');

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
  font-size: 20px;
  font-weight: 600;
  font-family: 'IBM Plex Sans', sans-serif;
  letter-spacing: 0.4px;
  color: white;
  white-space: nowrap;
}
</style>
