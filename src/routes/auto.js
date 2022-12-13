const { Router } = require("express");
const { getAutos, postAuto, getAuto, putAuto, deleteAuto } = require("../controllers/auto.js")
const { validarBodyAuto } = require("../validators/auto.js")
const router = Router();

router
    .get("/", getAutos)
    .get("/:id", getAuto)
    .post("/", validarBodyAuto, postAuto)
    .put("/:id", validarBodyAuto, putAuto)
    .delete("/:id", deleteAuto)

module.exports = router;