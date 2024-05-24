const express = require('express');
const router = express.Router();

// Importar controladores
const { registerUser, loginUser, getAllUsers, deleteUser, updateUser } = require('../controller/userController');
const { registerPatient, getAllPatients, deletePatient, updatePatient } = require('../controller/patientController');
const { createMedicine, deleteMedicine, getAllMedicines } = require('../controller/medicineController');

// Middleware para autenticación
const authenticateToken = require('../auth/authMiddleware');

// Rutas para usuarios
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-all-users', authenticateToken, getAllUsers);
router.delete('/users/:email', authenticateToken, deleteUser);
router.put('/users/:email', authenticateToken, updateUser);

// Rutas para pacientes
router.post('/register-patient', authenticateToken, registerPatient);
router.get('/get-all-patients', authenticateToken, getAllPatients);
router.delete('/patients/:id', authenticateToken, deletePatient);
router.put('/patients/:id', authenticateToken, updatePatient);

// Rutas para medicamentos
router.post('/medicines', createMedicine);
router.get('/all-medicines', getAllMedicines);
router.delete('/medicines/:nombre', deleteMedicine);

module.exports = router;
