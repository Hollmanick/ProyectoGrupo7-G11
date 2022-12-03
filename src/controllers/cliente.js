const { Cliente } = require('../models/cliente.js')
const { matchedData } = require('express-validator');

/**
 * Listar todos los clientes de la base de datos
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getClientes = async (req,res) => {
    try {
        // Obtener todos los documentos existentes dentro de la coleccion cliente
        const clientes = await Cliente.find({}).lean();
        res.status(200).json({
            "code_response": 200,
            "res": clientes
        }) 
    } catch (error) {
        console.log(error.message)
        res.json({"res_description":error.message})
    }
}

/**
 * Crear un nuevo documento del Schema Cliente
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
 const postCliente = async (req,res) => {
    try {
        const body  = matchedData(req);
        console.log("req.body", body);
        const newCliente = await Cliente.create(body);
        console.log(newCliente);
        res.status(200).json({
            "code_response": 200,
            "res_description": "Documento Cliente creado"
        })
    } catch (error) {
        console.log(error.message)
        res.json({"res_description":error.message})
    }
    
}

module.exports = {
    getClientes,
    postCliente
}