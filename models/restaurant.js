// Q1 載入json檔案
const data = require('./restaurant.json')
const restaurantList = data.results

// Q3 為什麼不用Schema?
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Q2 資料結構 ?
const restaurantSchema = new Schema({
  results: {
    
  }
})
module.exports = mongoose.model('Todo', todoSchema)