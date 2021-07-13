const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => { console.log('mongoDB error!') })
db.once('open', () => { console.log('mongoDB connected!') })

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
// 設定每一筆請求都會先以 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// index
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ _id: 'asc' }) // 新增這裡：根據 _id 升冪排序
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

// search
app.get('/restaurants/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()

  Restaurant.find()
    .lean()
    .then(restaurants => {
      if (keyword) {
        restaurants = restaurants.filter(restaurant =>
          restaurant.name_en.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
          restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) ||
          restaurant.category.toLocaleLowerCase().includes(keyword))
      }
      if (restaurants.length === 0) {
        const error = '找不到符合搜尋的結果!'
        return res.render('index', { error })
      }
      res.render('index', { restaurants })
    })
  .catch(error => console.log(error))
})

// create
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body // 拿出表單裡的所有 req.body 資料

  if (!name || !category || !image || !location || !phone || !google_map || !rating || !description) {
    return res.redirect('/restaurants/new')
  } // 如果有增加任一個欄位(除了英文名稱)的資料，就導回 new
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })  // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

// detail
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch((error) => console.error(error))
})

// edit 
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.error(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const updatedRestaurant = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = updatedRestaurant.name
      restaurant.name_en = updatedRestaurant.name_en
      restaurant.category = updatedRestaurant.category
      restaurant.image = updatedRestaurant.image
      restaurant.location = updatedRestaurant.location
      restaurant.phone = updatedRestaurant.phone
      restaurant.google_map = updatedRestaurant.google_map
      restaurant.rating = updatedRestaurant.rating
      restaurant.description = updatedRestaurant.description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

// delete 
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})