<!--  -->
<template>
  <div>
    <el-sub-menu
      v-if="route.children.length && route.children.length > 0"
      :index="route.path"
    >
      <template #title>
        <item :title="route.meta.title" :icon="route.meta.icon"></item>
      </template>
      <sidebar-item
        v-for="child in route.children"
        :key="child.path"
        :route="child"
      ></sidebar-item>
    </el-sub-menu>
    <el-menu-item v-else :index="route.path">
      <item :title="route.meta.title" :icon="route.meta.icon"></item>
    </el-menu-item>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import Item from './Item.vue'
defineProps({
  route: {
    type: Object,
    required: true
  }
})
</script>

<style lang="scss"></style>
