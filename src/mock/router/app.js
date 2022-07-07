const express = require('express')

const router = express.Router()

const { getFeature } = require('../app')

// 根据语言获取功能数据
router.get('/feature', (req, res) => {
  res.json(getFeature(req))
})

module.exports = router
