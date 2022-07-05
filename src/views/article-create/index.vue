<!--  -->
<template>
  <div class="article-create-container">
    <el-card>
      <el-input
        class="title-input"
        v-model="titleInput"
        :placeholder="$t('msg.article.titlePlaceholder')"
      ></el-input>
      <el-tabs v-model="activeName" type="card" class="article-tabs">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <markdown
            :title="titleInput"
            @onCommitSuccess="onSuccess"
            :articleDetail="articleDetail"
          ></markdown>
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="richText">
          <editor
            :title="titleInput"
            :detail="articleDetail"
            @onSuccess="onSuccessClick"
          ></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Markdown from './components/Markdown.vue'
import Editor from './components/Editor.vue'
import { useRoute } from 'vue-router'
import { getArticleDetail } from '@/api/article.js'
const titleInput = ref('')
const activeName = ref('markdown')

const onSuccess = () => {
  // 创建文章之后重置文章标题
  titleInput.value = ''
}

// 编辑文章
// 先获取文章已有内容和标题并展示出来，传给markdown

const route = useRoute()
const articleId = route.params.id
const articleDetail = ref({})
const getArticleDetails = async () => {
  articleDetail.value = await getArticleDetail(articleId)
  titleInput.value = articleDetail.value.title
}
if (articleId) {
  getArticleDetails()
}
</script>

<style lang="scss" scoped>
.article-create-container {
  .title-input {
    margin-bottom: 25px;
    ::v-deep .el-input__inner {
      font-size: 16px;
      border: 0;
      padding-left: 3px;
    }
  }

  .article-tabs {
    height: 700px;
  }
}
</style>
