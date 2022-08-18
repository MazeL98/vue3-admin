import express from 'express'
import bodyParser from 'body-parser'

const port = process.env.PORT || 3000

const app = express()

// 引入自定义的 mock API
import sys from './router/sys.js'
import staffManage from './router/staff-manage.js'
import permission from './router/permission.js'
import role from './router/role.js'
import article from './router/article.js'
import chart from './router/chart.js'

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

app.use('/sys', sys)
app.use('/staff-manage', staffManage)
app.use('/permission', permission)
app.use('/role', role)
app.use('/article', article)
app.use('/chart', chart)

app.listen(port, () => {
  console.log('Mock server is listening 3000')
})
