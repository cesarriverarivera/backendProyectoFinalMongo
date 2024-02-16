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

    const {email, password} =req.body

    //verificar que exista un usuario con ese email
    const user = await User.findOne({email})

    //si el usuario existe tambien verificamos el password
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Credenciales incorrectas')
    }
})

const userData = asyncHandler( async (req, res) => {
    res.status(201).json(req.user) //con req.user puedo mostrar todos los datos del usario porque al proteger la ruta en userRouters, puedo tener acceso a todo lo que contenga la funcion protectora
})

//funcion para generar el token
const generateToken = (id_usuario) => {
    return jwt.sign({id_usuario}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    } )
}

module.exports = {
    createUser,
    loginUser,
    userData
}