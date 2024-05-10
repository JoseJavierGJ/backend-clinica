class IPatient {
  /* 
    Crear un nuevo paciente
    @param {string} nombre -> Nombre del paciente
    @param {string} apaterno -> Apellido paterno del paciente
    @param {string} amaterno -> Apellido materno del paciente
    @param {string} fechaNacimiento -> Fecha de nacimiento del paciente
    @param {string} telefono -> Teléfono del paciente
    @param {string} historialMedico -> Historial médico del paciente
    @return {Promise<Patient>}
    @throw {error} si hay un error en la creación
  */
  static async createPatient(nombre, apaterno, amaterno, fechaNacimiento, telefono, historialMedico) {}

  /* 
    Obtener todos los pacientes
    @return {Promise<Array>}
    @throw {error} si hay un error en la obtención de los datos
  */
  static async getAllPatients() {}

  /* 
    Actualizar un paciente
    @param {string} patientId -> ID del paciente
    @param {object} patientData -> Datos del paciente a actualizar
    @return {Promise<Object>}
    @throw {error} si hay un error en la actualización
  */
  static async updatePatient(patientId, patientData) {}

  /* 
    Eliminar un paciente
    @param {string} patientId -> ID del paciente
    @return {Promise<void>}
    @throw {error} si hay un error en la eliminación
  */
  static async deletePatient(patientId) {}
}

module.exports = IPatient;
