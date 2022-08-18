const mongoose = require("mongoose");
//
const PacienteSchema = mongoose.Schema({
  nombreCompleto: String,
  porcentajeAzucar: Number,
  porcentajeGrasa: Number,
  porcentajeOxigeno: Number,
  riesgo: String,
});
//
module.exports = mongoose.model("pacientes", PacienteSchema);
