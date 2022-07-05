import request from '@/utils/request.js'

// 获取所有文章
export const getAllArticleList = (data) => {
  return request({
    url: '/article/list',
    params: data
  })
}

// 修改文章顺序
export const SortArticle = (data) => {
  return request({
    url: '/article/sort',
    method: 'POST',
    data
  })
}

// 删除文章
export const deleteArticle = (articleId) => {
  return request({
    url: `/article/delete/${articleId}`
  })
}

// 获取文章详情
export const getArticleDetail = (articleId) => {
  return request({
    url: `/article/${articleId}`
  })
}

// 创建新文章
export const createArticle = (data) => {
  return request({
    url: '/article/create',
    method: 'POST',
    data
  })
}

// 编辑文章内容
export const editArticle = (data) => {
  return request({
    url: '/article/edit',
    method: 'POST',
    data
  })
}
