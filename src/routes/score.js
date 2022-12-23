const { Router } = require("express");
const { getScores, postScore, getScore, putScore, deleteScore } = require("../controllers/score.js")
const { validarBodyScore } = require("../validators/score.js")
const router = Router();

router
    .get("/mostrarScores", getScores)
    .get("/mostrarScore/:id", getScore)
    .post("/agregarScore", validarBodyScore, postScore)
    .put("/editarScore/:id", validarBodyScore, putScore)
    .delete("/eliminarScore/:id", deleteScore)

module.exports = router;