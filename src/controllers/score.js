const { Score } = require('../models/score.js')
const { matchedData } = require('express-validator');

/**
 * Listar todos las scores de la base de datos
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getScores = async (req,res) => {
    try {
        // Obtener todos los documentos existentes dentro de la coleccion score
        const scores = await Score.find({}).lean();
        res.status(200).json({
            "code_response": 200,
            "res": scores
        }) 
    } catch (error) {
        console.log(error.message)
        res.json({"res_description":error.message})
    }
}

/**
 * Crear un nuevo documento del Schema Score
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
 const postScore = async (req,res) => {
    try {
        const body  = matchedData(req);
        console.log("req.body", body);
        const newScore = await Score.create(body);
        console.log(newScore);
        res.status(200).json({
            "code_response": 200,
            "res_description": "Documento Score creado"
        })
    } catch (error) {
        console.log(error.message)
        res.json({"res_description":error.message})
    }
    
}

module.exports = {
    getScores,
    postScore
}