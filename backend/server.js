const express = require('express') //crear backend con express
const dotEnv = require('dotenv').config() // para las variables de entorno
const colors = require('colors')
const connectDb = require('./config/db')
const {errorHandler}  = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000  //para usar una variable de entorno se usa proces.env.(la variable de entorno)

connectDb()  //para conectar el backend a la base de datos

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/products', require('./routes/productRoutes')) //consume las rutas creadas en carpeta routes
app.use('/api/users', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`Servidor inciado en el puerto: ${port}`))
