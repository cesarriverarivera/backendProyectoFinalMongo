const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')


const createUser = asyncHandler( async (req, res) => {
    //desestructuro el body para poder acceder mas facil
    const {name, email, password} =req.body 

    //verificamos que nos pasen todos los datos
    if(!name ||!email || !password) { 
        res.status(400)
        throw new Error('Faltan datos')
    }

    //verificar que el usuario no exista a traves de su email
    const userExits = await User.findOne({email}) //debe devolver true
    if(userExits) {
        res.status(400)
        throw new Error('Ese usuario ya existe en la base de datos')
    }

    //hacemos el hash al password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt) //esto devuelve al hash

    //Crear el usuario
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email
        })
    } else {
        res.status(400)
        throw new Error('Usuario no pudo ser creado')
    }

})

const loginUser = asyncHandler( async (req, res) => {
    res.status(201).json({message: "login usuario"})
})

const userData = asyncHandler( async (req, res) => {
    res.status(201).json({message: "obtener usuario"})
})

module.exports = {
    createUser,
    loginUser,
    userData
}