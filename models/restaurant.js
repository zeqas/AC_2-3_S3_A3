// Q1 載入json檔案
const data = require('./restaurant.json')
const restaurantList = data.results

// Q3 為什麼不用Schema?
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Q2 資料結構 ?
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  name_en: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)