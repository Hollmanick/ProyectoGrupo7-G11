const {check,validationResult} = require('express-validator');

const validarBodyAlquiler = [
  check('fechaEntrega').exists().notEmpty().isDate(),
  check('fechaDevolucion').exists().notEmpty().isDate(),
  check('status').exists().notEmpty().isString(),
  (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    req.validationResult = true;
    next();
  }
]

module.exports = {validarBodyAlquiler};