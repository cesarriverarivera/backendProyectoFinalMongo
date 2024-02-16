const express = require('express')
const router = express.Router()
const {createUser, loginUser, userData} = require('../controllers/userControllers')
const {protect} = require('../middleware/authMiddleware')

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/usersdata', protect, userData)  //protect es la funcion protectora con jwt para obtener datos del usuario


module.exports = router