const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results})
})

app.get('/restaurants/:restaurant_id', (req, res) =>{
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant.restaurant_id)
  res.render('show', { restaurant : restaurant})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name_en.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()) || restaurant.name.includes(keyword)
  })

  res.render('index', { restaurants : restaurants, keyword : keyword})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})