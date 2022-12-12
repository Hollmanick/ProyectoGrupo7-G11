const {Router} = require('express');
const {getScores,getScore, postScore, putScore, deleteScore, getAlquilerScore} = require('../controllers/score.js')
const {validarBodyScore} = require('../validators/score.js')
const router = Router();

router
  .get('/', getScores)
  .get('/:id', getScore)
  .get('/alquiler/:id',getAlquilerScore)
  .post('/',validarBodyScore, postScore)
  .put('/:id',validarBodyScore, putScore)
  .delete('/:id', deleteScore)

module.exports = router;