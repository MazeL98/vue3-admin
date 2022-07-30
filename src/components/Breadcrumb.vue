<!--  -->
<template>
  <div class="breadcrumb-container">
    <el-breadcrumb separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
          <span class="no-redirect" v-if="index === breadList.length - 1">
            {{ $t('msg.route.' + item.meta.title) }}
          </span>
          <span class="redirect" v-else @click="handleClick(item)">
            {{ $t('msg.route.' + item.meta.title) }}
          </span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
item
<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
const route = useRoute()
const breadList = ref([])
const getBreadcrumb = () => {
  breadList.value = route.matched.filter(
    (routeItem) => routeItem.meta && routeItem.meta.title
  )
}
watch(
  route,
  () => {
    getBreadcrumb()
  },
  { immediate: true }
)

const router = useRouter()
const handleClick = (item) => {
  if (item.redirect) {
    router.push(item.redirect)
  } else {
    router.push(item.path)
  }
}

const store = useStore()
const hoverColor = computed(() => {
  return store.getters.mainColor
})
</script>

<style lang="scss" scoped>
.no-redirect {
  color: #97a8be;
}

.redirect {
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: v-bind(hoverColor);
  }
}
</style>
