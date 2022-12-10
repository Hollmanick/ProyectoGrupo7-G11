const {check,validationResult} = require('express-validator');

const validarBodyScore = [
  check('score').exists().notEmpty().isInt().isString(),
  check('descripcion').exists().notEmpty().isLength({min:4, max:255}),
  check('alquiler').exists().notEmpty().isLength({min:3, max:50}),
  
  (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    req.validationResult = true;
    next();
  }
]

module.exports = {validarBodyScore};