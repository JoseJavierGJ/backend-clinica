// const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const userDoc = await User.findByEmail(email)
    if (!userDoc) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    const isValidPass = await userDoc.verifyPassword(password)
    if(!isValidPass) {
      return res.status(401).json({
        message: 'Invalid Credentials'
      })
    }

    const token = jwt.sign({ email: userDoc.email, nombre: userDoc.nombre, especialidad: userDoc.especialidad, apaterno: userDoc.apaterno }, process.env.SECRET, { expiresIn: '1h' }) 
    res.status(200).json({ 
      message: 'success',
      token,
      userEmail: userDoc.email,
      userNombre: userDoc.nombre,
      userApaterno: userDoc.apaterno,
      userEspecialidad: userDoc.especialidad
    })
  } catch (error) {
    res.status(500).json ({
      message: 'Internal Server Error'
    })
  }
}



const registerUser = async (req, res) => {
  try {
    const { email, password, nombre, apaterno, amaterno, especialidad, telefono } = req.body
    const existingUser = await User.findByEmail(email)
    if (existingUser) {
      return res.status(400).json ({
        message: 'User already exists'
      })
    }
    const newUser = await User.createUser(email, password, nombre, apaterno, amaterno, especialidad, telefono)
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    }) 
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.json({
      users,
      message: 'success'
    })  
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const deleteUser = async (req, res) => {
  const userEmail = req.params.email
  try {
    await User.deleteUser(userEmail)
    res.status(204).send()
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const updateUser = async (req, res) => {
  const userEmail = req.params.email
  const userData = req.body
  try {
    const userUpdated = await User.updateUser(userEmail, userData)
    res.json({
      userUpdated,
      message: 'success'
    })
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

module.exports = { registerUser, loginUser, getAllUsers, deleteUser, updateUser }