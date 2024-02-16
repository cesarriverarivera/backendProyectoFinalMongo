const express = require('express')
const router = express.Router()
const {getProducts, updateProducts, createProducts, deleteProducts} = require('../controllers/productControllers')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, getProducts)

router.post('/', protect, createProducts)

router.put('/:id', protect, updateProducts)

router.delete('/:id', protect, deleteProducts)

module.exports = router
