var express = require("express");
var CategoryController = require("../controllers/clase");

var router = express.Router();


router.post("/guardarClase", CategoryController.save);
router.post("/loginClase", CategoryController.login);
router.put("/actualizarClase/:id", CategoryController.update);
router.delete("/eliminarClase/:id", CategoryController.eliminar);
router.get("/Clases", CategoryController.ListaClases);
router.get("/Clase/:id", CategoryController.mostrarClase);

module.exports = router;