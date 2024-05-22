const Medicine = require('../models/Medicine');

const createMedicine = async (req, res) => {
  try {
    const { nombre, descripcion, precio, duracion } = req.body;
    const newMedicine = await Medicine.createMedicine(nombre, descripcion, precio, duracion);
    res.status(201).json({
      message: 'Medicine created successfully',
      medicine: newMedicine
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message  // Más información sobre el error
    });
  }
}

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.getAllMedicines();
    res.json({
      medicines,
      message: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
}

module.exports = { createMedicine, getAllMedicines };