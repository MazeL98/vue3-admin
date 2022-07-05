<!--  -->
<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch, onMounted } from 'vue'
import E from 'wangeditor'
import i18next from 'i18next'
import { useStore } from 'vuex'
import { commitArticle, editArticleDetail } from '@/api/article.js'
const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})
const emits = defineEmits(['onSuccess'])

let editor
let el
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 国际化
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

const onSubmitClick = async () => {
  // 编辑文章内容
  if (props.detail && props.detail._id) {
    await editArticleDetail({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    // 新建文章
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }
  // 上传成功后重置编辑器内容
  editor.txt.html('')
  emits('onSuccess')
}

watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
