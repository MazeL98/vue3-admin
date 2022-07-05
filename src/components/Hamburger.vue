<!--  -->
<template>
  <div class="hamburger-container" @click="handleClick">
    <svg-icon
      id="guide-hamburger"
      :icon="hamburgerIcon"
      className="hamburger-icon"
    ></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const hamburgerIcon = computed(() => {
  return store.getters.sidebarOpened ? 'hamburger_opened' : 'hamburger_closed'
})

const handleClick = () => {
  store.commit('app/toggleSidebar')
}
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  ::v-deep .hamburger-icon {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
}
</style>
