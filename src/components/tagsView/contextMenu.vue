<!--  -->
<template>
  <ul class="context-menu-container">
    <li class="menu-item" @click="onRefreshClick">
      {{ $t(`msg.tagsView.refresh`) }}
    </li>
    <li class="menu-item" @click="onCloseRightClick">
      {{ $t(`msg.tagsView.closeRight`) }}
    </li>
    <li class="menu-item" @click="onCloseOtherClick">
      {{ $t(`msg.tagsView.closeOther`) }}
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const props = defineProps({
  index: {
    type: Number,
    required: true
  }
})

// 刷新事件
const router = useRouter()
const onRefreshClick = () => {
  router.go(0)
}

// 关闭右侧标签
const store = useStore()
const onCloseRightClick = () => {
  // 通知 vuex 删除
  store.commit('app/removeTag', {
    type: 'right',
    index: props.index
  })
}
const onCloseOtherClick = () => {
  store.commit('app/removeTag', {
    type: 'others',
    index: props.index
  })
}
</script>

<style lang="scss" scoped>
.context-menu-container {
  position: fixed;
  padding: 5px 0;
  background-color: #fff;
  list-style-type: none;
  border-radius: 3px;
  box-shadow: 1px 1px 3px 1px rgba(0, 0, 0, 0.3);

  & .menu-item {
    font-size: 14px !important;
    padding: 6px 16px;
    cursor: pointer;
    &:hover {
      background-color: #f3f3f3;
    }
  }
}
</style>
