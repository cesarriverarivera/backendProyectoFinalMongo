const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

//para obtener la lista de productos
const getProducts = asyncHandler( async (req, res) => {

    const products = await Product.find({user: req.user.id})


    res.status(200).json(products)
})

//para crear productos
const createProducts = asyncHandler( async  (req, res) => {
    
    if (!req.body.name) {
        res.status(400)
        throw new Error('Por favor escribe un nombre de producto')
    }

    const product = await Product.create({
        name: req.body.name,
        user: req.user.id //para poder crear un producto con un id de usuario
    })
    res.status(201).json(product)
})

//para modificar productos
const updateProducts = asyncHandler( async  (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(400)
        throw new Error('ese producto no existe')
    }

    //nos aseguramos que la producto pertenezca al usuario logeado, es decir el del token
    if(product.user.toString() !== req.user.id) { //req.user viene de la funcion protectora protect
        res.status(401)
        throw new Error('Usuario no autorizado')
        
    } else {
        const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(productUpdated)
    }
})

//para eliminar productos
const deleteProducts = asyncHandler( async  (req, res) => {
    const product = await Product.findById(req.params.id)

    if(!product) {
        res.status(400)
        throw new Error('ese producto no existe')
    }

     //nos aseguramos que la producto pertenezca al usuario logeado, es decir el del token
    if(product.user.toString() !== req.user.id) { //req.user viene de la funcion protectora protect
        res.status(401)
        throw new Error('Usuario no autorizado')
        
    } else {
        await Product.deleteOne(product)
        res.status(200).json({id: req.params.id})
    } 
})

module.exports = {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts
}