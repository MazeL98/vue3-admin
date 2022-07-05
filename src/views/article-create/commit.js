import { createArticle, editArticle } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import i18n from '@/i18n'

export const commitArticle = async (data) => {
  const res = await createArticle(data)
  ElMessage.success(i18n.global.t('msg.article.createSuccess'))
  return res
}

export const editArticleDetail = async (data) => {
  const res = await editArticle(data)
  ElMessage.success(i18n.global.t('msg.article.editorSuccess'))
  return res
}
