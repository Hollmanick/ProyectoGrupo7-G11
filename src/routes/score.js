const { Router } = require("express");
const { getScores, postScore, getScore, putScore, deleteScore } = require("../controllers/score.js")
const { validarBodyScore } = require("../validators/score.js")
const router = Router();

router
    .get("/", getScores)
    .get("/:id", getScore)
    .post("/", validarBodyScore, postScore)
    .put("/:id", validarBodyScore, putScore)
    .delete("/:id", deleteScore)

module.exports = router;
