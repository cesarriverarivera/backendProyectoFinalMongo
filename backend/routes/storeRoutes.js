const express = require('express')
const router = express.Router()
const {getProducts, updateProducts, createProducts, deleteProducts} = require('../controllers/storeControllers')


router.get('/', getProducts)

router.post('/', createProducts)

router.put('/:id', updateProducts)

router.delete('/:id', deleteProducts)

module.exports = router
