const express = require('express')
const router = express.Router()
const {
  createLink,
  getLink,
  getAllLinks,
} = require('../controllers/linkControllers')

router.route('/').post(createLink)
router.route('/:shortLink').get(getLink)
// router.route('/links').get(getAllLinks)

module.exports = router
