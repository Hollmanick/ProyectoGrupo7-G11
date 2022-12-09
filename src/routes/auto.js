const { Router } = require("express");
const { getAutos, postAuto } = require("../controllers/auto.js")
const { validarBodyAuto } = require("../validators/auto.js")
const router = Router();

router
    .get("/", getAutos)
    .get("/:id",)
    .post("/", validarBodyAuto, postAuto)
    .put("/:id",)
    .delete("/:id",)

module.exports = router;