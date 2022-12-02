var express = require ("express");
var UserController = require("../controllers/usuario");

var router = express.Router();

router.get("/probando", UserController.probando);
router.post("/testeando", UserController.testeando);

router.post("/guardarUsuario", UserController.save);
router.post("/login", UserController.login);
router.put("/actualizarUsuario", UserController.update);
router.delete("/eliminarUsuario", UserController.delete);
router.get("/usuarios", UserController.listarUsuarios);
router.get("/usuario", UserController.mostrarUsuario);

module.exports = router;
