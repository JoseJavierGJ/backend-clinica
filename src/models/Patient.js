const admin = require('../config/firebase');
const IPatiets = require('../interfaces/IPatient'); // Asumiendo que tienes una interfaz básica para las personas
const firestore = admin.firestore();

class Patient extends IPatiets {
  constructor(nombre, apaterno, amaterno, fechaNacimiento, telefono, historialMedico) {
    super();
    this.nombre = nombre;
    this.apaterno = apaterno;
    this.amaterno = amaterno;
    this.fechaNacimiento = fechaNacimiento;
    this.telefono = telefono;
    this.historialMedico = historialMedico;
  }

  static async createPatient(nombre, apaterno, amaterno, fechaNacimiento, telefono, historialMedico) {
    try {
      const patientRef = firestore.collection('patients').doc();
      await patientRef.set({
        nombre,
        apaterno,
        amaterno,
        fechaNacimiento,
        telefono,
        historialMedico
      });
      return patientRef.id; // Retorna el ID del documento creado
    } catch (error) {
      console.log('Error => ', error);
      throw new Error('Error creating patient');
    }
  }

  static async getAllPatients() {
    try {
      const patients = await firestore.collection('patients').get();
      const foundPatients = [];
      patients.forEach(doc => {
        foundPatients.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return foundPatients;
    } catch (error) {
      throw error;
    }
  }

  static async deletePatient(patientId) {
    try {
      await firestore.collection('patients').doc(patientId).delete();
    } catch (error) {
      throw error;
    }
  }

  static async updatePatient(patientId, patientData) {
    try {
      await firestore.collection('patients').doc(patientId).update(patientData);
      const patientUpdated = await firestore.collection('patients').doc(patientId).get();
      return {
        patientUpdated: patientUpdated.data()
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Patient;
