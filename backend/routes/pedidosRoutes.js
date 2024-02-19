const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')
const {getOrders, postOrders} = require('../controllers/orderControllers')


router.get('/',protect, getOrders )
router.post('/', protect, postOrders)


module.exports = router