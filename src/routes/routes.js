const express = require('express');
const router = express.Router();

// Importar controladores
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require('../controller/userController');
const { registerPatient, getAllPatients, deletePatient, updatePatient } = require('../controller/patientController');

// Middleware para autenticación
const authenticateToken = require('../auth/authMiddleware');

// Rutas para usuarios
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-all-users', authenticateToken, getAllUsers);
router.delete('/users/:email', authenticateToken, deleteUser);
router.put('/users/:email', authenticateToken, updateUser);

// Rutas para pacientes
router.post('/register-patient', registerPatient);
router.get('/get-all-patients', getAllPatients);
router.delete('/patients/:id', deletePatient);
router.put('/patients/:id', updatePatient);

module.exports = router;
