const { Router } = require('express');
const { getScores, postScore } = require('../controllers/score.js')
const { validarBodyScore } = require('../validators/score.js')
const router = Router();

router
    .get('/', getScores)
    .get('/:id',)
    .post('/', validarBodyScore, postScore)
    .put('/:id',)
    .delete('/:id',)

module.exports = router;