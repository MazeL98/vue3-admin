<!--  -->
<template>
  <div class="feature-container">
    <el-collapse class="feature-collapse" v-model="activeName">
      <el-collapse-item
        v-for="item in feature"
        :key="item.titole"
        :title="item.title"
        :name="item.id"
      >
        <div>{{ item.content }}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
const activeName = ref(0)
defineProps({
  feature: {
    type: Array
  }
})
</script>

<style lang="scss" scoped>
.feature-collapse {
  ::v-deep .el-collapse-item__header {
    font-weight: 600;
  }
}
</style>
