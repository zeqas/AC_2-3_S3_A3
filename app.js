const express = require('express')
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => { console.log('mongodb error!') })
db.once('open', () => { console.log('mongodb connected!') })

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// index
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.error(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = Restaurant.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant : restaurant})
})

// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = Restaurant.results.filter(restaurant => {
    return restaurant.name_en.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || 
    restaurant.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || 
    restaurant.category.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())

  })

  res.render('index', { restaurants : restaurants, keyword : keyword})
})

// create
app.post('/restaurants', (req, res) => {
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body // 拿出表單裡的所有 req.body 資料

  if (!name || !category || !image || !location || !phone || !google_map || !rating || !description) {
    return res.redirect('/restaurants/new')
  } // 如果有增加任一個欄位(除了英文名稱)的資料，就導回 new
  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })  // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})