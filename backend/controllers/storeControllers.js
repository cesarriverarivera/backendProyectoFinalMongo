const asyncHandler = require('express-async-handler')

const getProducts = asyncHandler( async (req, res) => {
    res.status(200).json({mesage: "get productos"})
})

const createProducts = asyncHandler( async  (req, res) => {
    
    if (!req.body.name) {
        res.status(400)
        throw new Error('Por favor escribe un nombre de producto')

    }
    res.status(201).json({mesage: "create productos"})
})

const updateProducts = asyncHandler( async  (req, res) => {
    res.status(200).json({mesage: `modificar el producto con id: ${req.params.id}`})
})

const deleteProducts = asyncHandler( async  (req, res) => {
    res.status(200).json({mesage: `eliminar el producto con id: ${req.params.id}`})
})

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}