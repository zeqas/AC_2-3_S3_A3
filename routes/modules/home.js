const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id   // 變數設定
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router