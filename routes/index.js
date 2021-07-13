const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const routes = require('./routes')

router.use('/', home)
router.use('/restaurants', restaurants)

module.exports = router