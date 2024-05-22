const IMedicine = require('../interfaces/IMedicine')
const admin = require('../config/firebase');
const firestore = admin.firestore();

class Medicine {
  constructor (nombre, descripcion, precio, duracion) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.duracion = duracion;
  }

  static async createMedicine (nombre, descripcion, precio, duracion) {
    try {
      const medicineRef = firestore.collection('medicines').doc(nombre);
      const medicineData = {
        nombre,
        descripcion,
        precio,
        duracion
      };
      await medicineRef.set(medicineData);
      return medicineData;  // Retornar los datos del medicamento creado
    } catch (error) {
      console.error('Error => ', error);
      throw new Error('Error creating medicine');
    }
  }

  static async getAllMedicines () {
    try {
      const snapshot = await firestore.collection('medicines').get();
      const foundMedicines = [];
      snapshot.forEach(doc => {
        foundMedicines.push(doc.data());
      });
      return foundMedicines;
    } catch (error) {
      console.error('Error retrieving medicines: ', error);
      throw new Error('Error retrieving medicines');
    }
  }
}

module.exports = Medicine;
