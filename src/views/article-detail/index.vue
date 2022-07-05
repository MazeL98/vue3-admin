<!--  -->
<template>
  <div class="article-details-container">
    <h2 class="title">{{ details.title }}</h2>
    <div class="header">
      <span class="author"
        >{{ $t('msg.article.author') }}：{{ details.author }}</span
      >
      <span class="time"
        >{{ $t('msg.article.publicDate') }}：{{
          $filters.relativeTime(details.publicDate)
        }}</span
      >
      <el-button type="text" class="edit" @click="onEditClick">{{
        $t('msg.article.edit')
      }}</el-button>
    </div>
    <div class="content" v-html="details.content"></div>
  </div>
</template>

<script setup>
import { ref, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getArticleDetail } from '@/api/article.js'

const route = useRoute()
const articleId = route.params.id
const details = ref({})
const getDetails = async () => {
  details.value = await getArticleDetail(articleId)
}

getDetails()
onActivated(getDetails)

// 编辑文章
const router = useRouter()
const onEditClick = () => {
  router.push(`/article/editor/${articleId}`)
}
</script>

<style lang="scss" scoped>
.article-details-container {
  .title {
    font-size: 22px;
    text-align: center;
    padding: 12px 0;
  }
  .header {
    padding: 26px 0;
    .author {
      font-size: 14px;
      color: #555666;
      margin-right: 20px;
    }
    .time {
      font-size: 14px;
      color: #999aaa;
      margin-right: 20px;
    }
    .edit {
      float: right;
    }
  }
  .content {
    font-size: 14px;
    padding: 20px 0;
    border-top: 1px solid #d4d4d4;
  }
}
</style>
