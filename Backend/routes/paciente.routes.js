// Rutas para ciudad
const express = require("express");
const router = express.Router();
const pacienteControllers = require("../controllers/pacienteControllers");

// api/pacientes
router.post("/", pacienteControllers.crearPaciente);
router.get("/", pacienteControllers.obtenerPacientes);
router.put("/:id", pacienteControllers.actualizarPaciente);
router.get("/:id", pacienteControllers.obtenerPaciente);
router.delete("/:id", pacienteControllers.eliminarPaciente);

module.exports = router;
