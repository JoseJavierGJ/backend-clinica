const admin = require('../config/firebase');
const IPatients = require('../interfaces/IPatient'); 
const firestore = admin.firestore();

class Patient extends IPatients {
  constructor(nombre, email, telefono, direccion, fecha, edad, sexo) {
    super();
    this.nombre = nombre;
    this.email = email;
    this.telefono = telefono;
    this.direccion = direccion;
    this.fecha = fecha;
    this.edad = edad;    
    this.sexo = sexo;
  }

  static async createPatient(userEmail, nombre, email, telefono, direccion, fecha, edad, sexo) {
    try {
      const patientRef = firestore.collection('patients').doc();
      await patientRef.set({
        userEmail,
        nombre,
        email,
        telefono,
        direccion,
        fecha,
        edad,
        sexo
      });
      return patientRef.id;
    } catch (error) {
      console.log('Error => ', error);
      throw new Error('Error creating patient');
    }
  }
  


  static async getAllPatients(userEmail) {
    try {
      const patientQuery = firestore.collection('patients').where('userEmail', '==', userEmail);
      const querySnapshot = await patientQuery.get();
      const foundPatients = [];
      querySnapshot.forEach(doc => {
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
