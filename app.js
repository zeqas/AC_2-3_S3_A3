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
  res.render('index', { restaurants: Restaurant.results})
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

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})