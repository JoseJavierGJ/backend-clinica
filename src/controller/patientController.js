const Patient = require('../models/Patient');

const registerPatient = async (req, res) => {
  try {
    const { nombre, apaterno, amaterno, fechaNacimiento, telefono, historialMedico } = req.body;
    const newPatient = await Patient.createPatient(nombre, apaterno, amaterno, fechaNacimiento, telefono, historialMedico);
    res.status(201).json({
      message: 'Patient registered successfully',
      patientId: newPatient
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.getAllPatients();
    res.json({
      patients,
      message: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const deletePatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    await Patient.deletePatient(patientId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

const updatePatient = async (req, res) => {
  const patientId = req.params.id;
  const patientData = req.body;
  try {
    const patientUpdated = await Patient.updatePatient(patientId, patientData);
    res.json({
      patientUpdated,
      message: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
};

module.exports = { registerPatient, getAllPatients, deletePatient, updatePatient };