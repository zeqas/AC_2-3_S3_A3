const data = require('./restaurant.json')
const restaurantList = data.results // 載入JSON資料

const Restaurant = require('../restaurant') // 載入 model

db.once('open', () => {
  console.log('mongodb connected!')
  // 建立資料，定義內容
  restaurantList.forEach((restaurant) =>
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  )
  console.log('done')
})