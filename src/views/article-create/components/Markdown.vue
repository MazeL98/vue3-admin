<!--  -->
<template>
  <div class="markdown-container">
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">{{
        $t('msg.article.commit')
      }}</el-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, watch } from 'vue'
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { useStore } from 'vuex'
import { watchLangSwitch } from '@/utils/i18n'
import { commitArticle, editArticleDetail } from '../commit'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  articleDetail: {
    type: Object
  }
})
const emits = defineEmits(['onCommitSuccess'])

let mkEditor
let el
// 每次挂载模板时初始化一次 tui-editor实例
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

// 新建 tui-editor实例
const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: '400px',
    previewSytle: 'vertical',
    language: store.getters.language === 'zh' ? 'zh' : 'en'
  })

  mkEditor.getMarkdown()
}

// 根据语言变化，重新初始化 tui-editor
watchLangSwitch(() => {
  if (!el) return
  const htmlString = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlString)
  console.log(htmlString)
})

// 提交文章内容，区分两种情况：新建 or 编辑
const onSubmitClick = async () => {
  if (props.articleDetail && props.articleDetail._id) {
    await editArticleDetail({
      id: props.articleDetail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }
  // 重置markdown
  mkEditor.reset()
  emits('onCommitSuccess')
}
// 从“编辑”按钮打开 tui-editor时，把已有的文章内容放到编辑器中
watch(
  () => props.articleDetail,
  (val) => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 30px;
    text-align: right;
  }
}
</style>
