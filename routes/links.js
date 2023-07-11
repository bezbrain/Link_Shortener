const express = require('express')
const router = express.Router()
const { getAllLinks } = require('../controllers/linkControllers')

router.route('/').get(getAllLinks)

module.exports = router
