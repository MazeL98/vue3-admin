const express = require('express')

const port = process.env.PORT || 3000

const app = express()

const bodyParser = require('body-parser')

// 引入自定义的 mock API
const appRouter = require('./router/app')
const sys = require('./router/sys')
const staffManage = require('./router/staff-manage')
const permission = require('./router/permission')
const role = require('./router/role')
const article = require('./router/article')
const chart = require('./router/chart')

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
app.use('/app', appRouter)
app.use('/sys', sys)
app.use('/staff-manage', staffManage)
app.use('/permission', permission)
app.use('/role', role)
app.use('/article', article)
app.use('/chart', chart)

app.listen(port, () => {
  console.log('Mock server is listening 3000')
})
