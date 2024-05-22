class IMedicine {
  /* 
    Crear un nuevo medicamento
    @param {string} nombre -> nombre del medicamento
    @param {string} descripcion -> descripción del medicamento
    @param {number} precio -> precio del medicamento
    @param {string} duracion -> duración de efectividad del medicamento
    @return {Promise<Medicine>}
    @throw {error} si hay un error en la creación
  */
  static async createMedicine (nombre, descripcion, precio, duracion) {}


  static async getAllMedicines () {}

}

module.exports = IMedicine;

