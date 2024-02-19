const asyncHandler = require('express-async-handler')
const Orders = require('../models/orderModel')
const Products = require('../models/productModel')

const getOrders =asyncHandler( async (req, res) => {

    const orders = await Orders.find({user: req.user.id})

    if(orders) {
        res.status(200).json(orders)
    }else {
        res.status(400)
        throw new Error('no hay ordenes registradas con este usuario')
    }

})

const postOrders =asyncHandler( async (req, res) => {
    //verifico que se haya escrito un nombre de producto a ordenar
    if(!req.body.name) {
        res.status(400)
        throw new Error('escriba un nombre de producto')
    }

    //verifico que el producto exita en la base de datos
    const productExits = await Products.findOne({name: req.body.name})

    if(!productExits) {
        res.status(400)
        throw new Error('producto no existe en la base de datos')
    }

    //creo la orden con el producto solicitado 
    const order = await Orders.create({
        user: req.user.id,
        name: req.body.name
    })

    if(order) {
        res.status(201).json(order)
    } else {
        res.status(400)
        throw new Error('no se creo orden')
    }
})

module.exports= {
    getOrders,
    postOrders
}