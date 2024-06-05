const IMedicine = require('../interfaces/IMedicine')
const admin = require('../config/firebase');
const firestore = admin.firestore();

class Medicine {
  constructor (nombre, descripcion, precio, duracion, mg) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.duracion = duracion;
    this.mg = mg;
  }

  static async createMedicine (nombre, descripcion, precio, duracion, mg) {
    try {
      const medicineRef = firestore.collection('medicines').doc(nombre);
      const medicineData = {
        nombre,
        descripcion,
        precio,
        duracion,
        mg
      };
      await medicineRef.set(medicineData);
      return medicineData;  // Retornar los datos del medicamento creado
    } catch (error) {
      console.error('Error => ', error);
      throw new Error('Error creating medicine');
    }
  }

  static async deleteMedicine (medicine) {
    try {
      await firestore.collection('medicines').doc(medicine).delete()
    } catch (error) {
      throw error
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

  static async updateMedicine(nombre, descripcion, precio, duracion, mg) {
    try {
      const medicineRef = firestore.collection('medicines').doc(nombre);
      const medicineData = {
        descripcion,
        precio,
        duracion,
        mg
      };
      await medicineRef.update(medicineData);
      return medicineData;  // Retornar los datos del medicamento actualizado
    } catch (error) {
      console.error('Error => ', error);
      throw new Error('Error updating medicine');
    }
  }
}

module.exports = Medicine;
