const { Alquiler } = require('../models/alquiler.js')
const { matchedData } = require('express-validator');

/**
 * Listar todos los alquileres de la base de datos
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getAlquileres = async (req,res) => {
    try {
        // Obtener todos los documentos existentes dentro de la coleccion alquiler
        const alquileres = await Alquiler.find({}).lean();
        res.status(200).json({
            "code_response": 200,
            "res": alquileres
        }) 
    } catch (error) {
        console.log(error.message)
        res.json({"res_description":error.message})
    }
}

/**
 * Crear un nuevo documento del Schema Alquiler
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
 const postAlquiler = async (req,res) => {
    try {
        const body  = matchedData(req);
        console.log("req.body", body);
        const newAlquiler = await Alquiler.create(body);
        console.log(newAlquiler);
        res.status(200).json({
            "code_response": 200,
            "res_description": "Documento Alquiler creado"
        })
    } catch (error) {
        console.log(error.message)
        res.json({"res_description":error.message})
    }
    
}

module.exports = {
    getAlquileres,
    postAlquiler
}