const {check,validationResult} = require("express-validator");

const validarBodyAlquiler = [
  check("fechaEntrega").exists().notEmpty().isISO8601().toDate().withMessage("Formato fecha ingresada es incorrecto, Ejem: 2022-09-09T00:00:00"),
  check("fechaDevolucion").exists().notEmpty().isISO8601().toDate().withMessage("Formato fecha ingresada es incorrecto, Ejem: 2022-09-09T00:00:00"),
  check("status").exists().notEmpty().isString(),
  (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});
    req.validationResult = true;
    next();
  }
]

module.exports = {validarBodyAlquiler};