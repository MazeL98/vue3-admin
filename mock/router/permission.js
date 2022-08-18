import express from 'express'
import { getAllPermission } from '../permission'

const router = express.Router()

// 获取所有权限列表
router.get('/list', (req, res) => {
  res.json(getAllPermission(req))
})

export default router
