const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant') // 載入 model
const User = require('../user')

const restaurantList = require('./restaurant.json').results // 載入餐廳的JSON資料
const db = require('../../config/mongoose')

const SEED_USERS = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    ownedRestaurants: [1, 2, 3]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    ownedRestaurants: [4, 5, 6]
  }
]

db.once('open', () => {
  // 將 SEED_USERS 的內容轉換為陣列，並且遍例
  Promise.all(Array.from(SEED_USERS, (seedUser, i) => {
    const owned = seedUser.ownedRestaurants
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
    .then(user => {
      const userId = user._id
      const restaurants = restaurantList.filter(restaurant => {
        owned.includes(restaurant.id)
      })
      restaurants.forEach(restaurant => {
        restaurant.userId = userId
      })
      return Restaurant.create(restaurants)
    })
  }))
    .then(() => {
      console.log('Seeder have been created!')
      process.exit()
    })
})