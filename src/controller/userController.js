const jwt = require('jsonwebtoken')
const User = require('../models/User')

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    // Buscamos el usuario para verificar que existe el correo electronico
    // ahora con firebase-admin solo lo podemos poner asi
    const userDoc = await User.findByEamil(email)
    // Si no existe el usuario
    if (!userDoc) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    // Verificar si el password es correcto
    const isValidPass = await userDoc.verifyPassword(password)
    if(!isValidPass) {
      return res.status(401).json({
        message: 'Invalid Credentials'
      })
    }

    // Generar el TOKEN
    const token = jwt.sign({ email: userDoc.email }, process.env.SECRET, { expiresIn: '1h' })
    res.status(200).json({ token })
  } catch (error) {
     res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findByEamil(email)
    if (existingUser) {
      return res.status(400).json({
        message: 'User already exixts'
      })
    }
    const newUser = await User.createUser(email, password)
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    })
  } catch (error) {
      res.status(500).json({
      message: 'Inernal Server Error'
    })
  }
}

module.exports = { registerUser, loginUser }