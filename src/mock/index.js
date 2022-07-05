const express = require('express')
const Mock = require('mockjs')

const port = process.env.PORT || 3000

const app = express()

const bodyParser = require('body-parser')

// 引入自定义的 mock API
const { login, getUserProfile } = require('./sys')
const { getFeature } = require('./app')
const {
  getStaffList,
  addStaff,
  deleteStaff,
  getAllStaffList,
  getStaffInfo,
  getStaffRoles,
  updateRoles
} = require('./staff-manage')
const { getRoleList, getPermission, distributePermission } = require('./role')
const { getAllPermission } = require('./permission')
const {
  getAllArticleList,
  sortArticle,
  deleteArticle,
  getArticleDetail,
  createArticle,
  editArticle
} = require('./article')

app.use(bodyParser.json())

// 允许跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  // 此处根据前端请求携带的请求头进行配置
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type,authorization'
  )
  next()
})

// 首次登录获取token
app.post('/api/sys/login', (req, res) => {
  res.json(login(req))
})

// 根据token获取用户资料
app.get('/api/sys/profile', (req, res) => {
  res.json(getUserProfile(req))
})

// 根据语言获取功能数据
app.get('/api/app/feature', (req, res) => {
  res.json(getFeature(req))
})

// 根据page&size参数返回相应员工列表
app.get('/api/staff-manage/list', (req, res) => {
  res.json(getStaffList(req))
})

// 添加员工信息
app.post('/api/staff-manage/list', (req, res) => {
  res.json(Mock.mock(addStaff(req)))
})

// 删除某个员工信息
app.get('/api/staff-manage/delete', (req, res) => {
  res.json(Mock.mock(deleteStaff(req)))
})

// 获取所有员工数据列表
app.get('/api/staff-manage/all-list', (req, res) => {
  res.json(getAllStaffList(req))
})

// 获取指定员工数据
app.get('/api/staff-manage/:id', (req, res) => {
  res.json(getStaffInfo(req))
})

// 获取角色列表
app.get('/api/role/list', (req, res) => {
  res.json(getRoleList(req))
})

// 获取指定员工的角色
app.get('/api/staff-manage/role/:id', (req, res) => {
  res.json(Mock.mock(getStaffRoles(req)))
})

// 更新员工的角色
app.post('/api/staff-manage/update-role/:id', (req, res) => {
  res.json(updateRoles(req))
})

// 获取所有权限列表
app.get('/api/permission/list', (req, res) => {
  res.json(getAllPermission(req))
})

// 获取指定角色的权限
app.get('/api/role/permission/:roleId', (req, res) => {
  res.json(getPermission(req))
})

// 更新角色的权限
app.post('/api/role/distribute-permission', (req, res) => {
  res.json(distributePermission(req))
})

// 获取所有文章
app.get('/api/article/list', (req, res) => {
  res.json(getAllArticleList(req))
})

// 文章排序
app.post('/api/article/sort', (req, res) => {
  res.json(sortArticle(req))
})

// 删除指定文章
app.get('/api/article/delete/:id', (req, res) => {
  res.json(deleteArticle(req))
})

// 获取文章详情
app.get('/api/article/:id', (req, res) => {
  res.json(getArticleDetail(req))
})

// 创建新文章
app.post('/api/article/create', (req, res) => {
  res.json(createArticle(req))
})

// 编辑文章内容
app.post('/api/article/edit', (req, res) => {
  res.json(editArticle(req))
})

app.listen(port, () => {
  console.log('Mock server is listening 3000')
})
