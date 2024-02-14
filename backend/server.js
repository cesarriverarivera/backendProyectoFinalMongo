const express = require('express') //crear backend con express
const dotEnv = require('dotenv').config() // para las variables de entorno
const port = process.env.PORT || 5000  //para usar una variable de entorno se usa proces.env.(la variable de entorno)

const app = express()

app.use('/api/store', require('./routes/storeRoutes')) //consume las rutas creadas en carpeta routes

app.listen(port, () => console.log(`Servidor inciado en el puerto: ${port}`))
