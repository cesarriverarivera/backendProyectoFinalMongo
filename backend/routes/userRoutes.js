const express = require('express')
const router = express.Router()
const {createUser, loginUser, userData} = require('../controllers/userControllers')

router.post('/', createUser)
router.post('/login', loginUser)
router.get('/usersdata', userData)


module.exports = router