<!--  -->
<template>
  <div
    class="header-search-container"
    :class="{ show: isShow }"
    @click.stop="onShowClick()"
  >
    <svg-icon
      id="guide-search"
      icon="search"
      className="header-search-icon"
    ></svg-icon>
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      remote
      :remote-method="querySearch"
      default-first-option
      placeholder="Search Something"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :value="option.item"
        :label="option.item.title.join(' > ')"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { filterRoutes, generateSearchPool } from '@/utils/modifyRoute.js'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { watchLangSwitch } from '@/utils/i18n.js'
const router = useRouter()
const search = ref('')
const isShow = ref(false)
const headerSearchSelectRef = ref(null)
const searchOptions = ref([])

// 优化细节: 鼠标点击外部，失焦、关闭、清除
watch(isShow, () => {
  if (isShow.value) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}
// 生成搜索数据池
let searchPool = computed(() => {
  const filteredRoutes = filterRoutes(router.getRoutes())
  return generateSearchPool(filteredRoutes)
})

// 生成 Fuse 实例
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool, {
    shouldSort: true,
    minMatchCharLength: 1,
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

// 因为 generateSearchPool 中已经加入了国际化处理
// 这里只需监听语言变化，重新调用该函数生成新 searchPool
// 并初始化 fuse 实例即可
watchLangSwitch(() => {
  searchPool = computed(() => {
    const filteredRoutes = filterRoutes(router.getRoutes())
    return generateSearchPool(filteredRoutes)
  })
  initFuse(searchPool.value)
})

const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

// 搜索函数
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
// 点击搜索结果，跳转路由
const onSelectChange = (value) => {
  router.push(value.path)
}
</script>

<style lang="scss" scoped>
.header-search-select {
  display: inline-block;
  width: 0;
  transition: width 0.3s;
  border-radius: 0;
  background: transparent;
  overflow: hidden;
  vertical-align: middle;

  ::v-deep(.el-input__inner) {
    outline: none;
    height: 30px;
    border: 0;
    border-radius: 0;
    padding: 0;
    border-bottom: 1px solid #d9d9d9;
    vertical-align: middle;
  }
}

.show {
  ::v-deep(.header-search-select) {
    width: 210px;
    margin-left: 10px;
  }
}
</style>
