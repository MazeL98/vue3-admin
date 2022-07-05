<!--  -->
<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform">
        <keep-alive>
          <component :is="Component" :key="route.path"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
