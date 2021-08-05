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
    ownedRestaurants: restaurantList.slice(0, 3)
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    ownedRestaurants: restaurantList.slice(3, 6)
  }
]

db.once('open', () => {
  // 將 SEED_USERS 轉換為陣列，並且遍例
  return Promise.all(SEED_USERS.map( user => {
    const owned = user.ownedRestaurants
    
    User.create({
      name: SEED_USERS.name,
      email: SEED_USERS.email,
      password: bcrypt.hashSync(SEED_USERS.password, bcrypt.genSaltSync(10))
    })
      .then(user => {
        
        return Promise.all(owned.map(async restaurant => {
          await Restaurant.create({
            name: restaurant.name,
            name_en: restaurant.name_en,
            category: restaurant.category,
            image: restaurant.image,
            location: restaurant.location,
            phone: restaurant.phone,
            google_map: restaurant.google_map,
            rating: restaurant.rating,
            description: restaurant.description,
            userId: user._id
          })
        }))
      })
  }))
    .then(() => {
    console.log('Seeder have been created!')
    process.exit()
    })
})