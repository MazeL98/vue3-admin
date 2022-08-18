<!--  -->
<template>
  <div class="card-container">
    <div class="icon">
      <svg-icon :icon="props.icon" class="card-icon"></svg-icon>
    </div>
    <div class="title">
      {{ props.title }}
    </div>
    <div class="desc">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
const store = useStore()
const mainColor = computed(() => {
  return store.getters.mainColor
})
</script>

<style lang="scss" scoped>
$themeColor: v-bind(mainColor);
$defaultColor: #fff;

.card-container {
  display: flex;
  color: #303133;
  flex-direction: column;
  align-items: center;
  width: 80%;
  border: 2px solid $defaultColor;
  border-color: $themeColor;

  &:hover {
    cursor: pointer;
    background-color: $themeColor;
    .icon {
      border-color: $defaultColor;
    }
    .title {
      color: $defaultColor;
    }
    ::v-deep(.svg-icon) {
      fill: $defaultColor;
    }
    .desc {
      color: $defaultColor;
    }
  }
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 55px;
  margin-top: 30px;
  border-radius: 50%;
  border: 2px solid $themeColor;

  ::v-deep(.svg-icon) {
    width: 25px;
    height: 25px;
    fill: $themeColor;
  }
}
.title {
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0px;
  color: $themeColor;
}
.desc {
  font-size: 14px;
  padding: 10px 30px 30px;
  line-height: 20px;
}
</style>
