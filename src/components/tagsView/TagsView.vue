<!--  -->
<template>
  <div class="tags-view-container">
    <router-link
      v-for="(tag, index) in $store.getters.tagsView"
      :key="tag.fullPath"
      :to="{ path: tag.fullPath }"
      class="tag-item"
      :class="isActive(tag) ? 'active' : ''"
      @contextmenu.prevent="openMenu($event, index)"
    >
      {{ tag.title }}
      <span
        class="close-icon-wrapper"
        v-show="!isActive(tag)"
        @click.prevent.stop="tagClose(index)"
      >
        <svg-icon icon="close" className="tag-close-icon"></svg-icon>
      </span>
    </router-link>
    <context-menu
      v-show="visible"
      :style="menuStyle"
      :index="selectedIndex"
    ></context-menu>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { watchLangSwitch } from '@/utils/i18n.js'
import { isTag, getTitle } from '@/utils/tags.js'
import contextMenu from './contextMenu.vue'
const route = useRoute()

const menuStyle = ref({
  top: '',
  left: ''
})

// 关闭选中菜单
const store = useStore()
const tagClose = (index) => {
  store.commit('app/removeTag', {
    type: 'current',
    index: index
  })
}

// 右键菜单
const visible = ref(false)
const selectedIndex = ref(0)
const openMenu = (e, index) => {
  visible.value = true
  const { x, y } = e
  selectedIndex.value = index
  menuStyle.value.top = y + 'px'
  menuStyle.value.left = x + 'px'
}

// 关闭右键菜单
const closeMenu = () => {
  visible.value = false
}
watch(visible, (val) => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

// 是否选中当下tag
const isActive = (tag) => {
  return tag.path === route.path
}

// 监听路由跳转，生成 tagsView数据源

watch(
  route,
  (to, from) => {
    if (isTag(route.path)) {
      const { fullPath, meta, name, params, path, query } = to
      store.commit('app/addTagsViewList', {
        fullPath,
        meta,
        name,
        params,
        path,
        query,
        title: getTitle(to)
      })
    }
  },
  {
    immediate: true
  }
)
// 监听语言变化，对 title 国际化处理
watchLangSwitch(() => {
  store.getters.tagsView.forEach((route, index) => {
    store.commit('app/changeTagsTitle', {
      index,
      tag: {
        ...route,
        title: getTitle(route)
      }
    })
  })
})

// hover 时颜色变量
const hoverTagColor = computed(() => {
  return store.getters.mainColor
})
</script>

<style lang="scss" scoped>
.tags-view-container {
  padding-left: 16px;
  height: 34px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  .tag-item {
    display: inline-block;
    font-size: 12px;
    height: 26px;
    line-height: 28px;
    padding: 0px 8px;
    margin-right: 5px;
    margin-top: 4px;
    border: 1px solid #d8dce5;

    &.active {
      background-color: v-bind(hoverTagColor);
      color: white;
      &::before {
        display: inline-block;
        content: ' ';
        position: relative;
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 4px;
      }
    }
  }
  .close-icon-wrapper {
    line-height: 26px;
    position: relative;
    ::v-deep .icon-wrapper {
      display: inline-block;
      position: relative;
      top: 2px;
      & .tag-close-icon {
        width: 16px;
        height: 16px;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
      }
    }
  }
}
</style>
