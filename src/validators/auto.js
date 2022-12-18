const { check, validationResult } = require("express-validator");

const validarBodyAuto = [
    check("nombre").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("marca").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("ahno").exists().notEmpty().isInt().not(),
    check("descripcion").exists().notEmpty().isLength({ min: 3, max: 50 }),
    check("categoria_id").isMongoId().optional({ checkFalsy: true }),
    check("mensaje_id").isMongoId().optional({ checkFalsy: true }),
    check("alquiler_id").isMongoId().optional({ checkFalsy: true }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        req.validationResult = true;
        next();
    }
]

module.exports = { validarBodyAuto };