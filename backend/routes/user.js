const express = require('express')

// controller functions
const { signupUser, loginUser, getUserDetails } = require('../controllers/userController.js')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// controller functions

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// Get user details route
router.get('/details', requireAuth, getUserDetails)

module.exports = router