const mongoose = require('mongoose')
const Restaurant = require('../restaurant') // 載入 model

mongoose.connect('mongodb://localhost/restaurant', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// 新增 8 筆資料
db.once('open', () => {
  console.log('mongodb connected!')
  
  for (let i = 0; i < 8; i++) {
    Todo.create({ name: 'name-' + i })
  }
  console.log('done')
})