const express = require('express')
const router = express.Router()
const { resgisterUser, loginUser, registerUser } = require('./../controller/userController')
const authenticateToken = require('./../auth/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/get-all-users', authenticateToken, (req, res) => {
  res.json({
    message: 'Protected Path'
  })
})

module.exports = router