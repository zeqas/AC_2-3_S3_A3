const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router