const { Cliente } = require('../models/cliente.js')
const { matchedData } = require('express-validator');

/**
 * Listar todos los documentos de la coleccion cliente y agregar un campo por cada una de las relaciones con sus documentos relacionados
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getClientes = async (req,res) => {
    try {
        // Obtener todos los documentos existentes dentro de la coleccion cliente
        const documentos = await Cliente.aggregate(
            [
                {   // primera etapa
                    $lookup: {
                        from: 'mensajes', // nombre del schema o coleccion foranea
                        localField: '_id', // clave del documento local 
                        foreignField: 'cliente_id', // clave del documento foraneo
                        as: 'mensajesCliente' // nombre del campo a agregar
                    }
                },
                {   // segunda etapa
                    $lookup: {
                        from: 'alquilers', // nombre del schema o coleccion foranea
                        localField: '_id', // clave del documento local 
                        foreignField: 'cliente_id', // clave del documento foraneo
                        as: 'alquilersCliente' // nombre del campo a agregar
                    }
                }      
            ]
        )
        console.log("getClientes documentos",documentos)
        console.log(documentos);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documentos con sus relaciones`,
            "data": documentos
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"res_description":error.message})
    }
}

/**
 * Encontrar un documento de la coleccion cliente por _id 
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
 const getCliente = async (req,res) => {
    try {
        const { id }  = req.params;
        console.log("req.params", id);
        const cliente = await Cliente.findById(id);
        console.log(cliente);
        res.status(200).json({
            "code_response": 200,
            "res_description": `cliente para id: ${id}`,
            "data": cliente
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"res_description":error.message})
    }
    
}

/**
 * Crear un nuevo documento en la coleccion cliente
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
            "res_description": "Documento Cliente creado",
            "data": newCliente
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({"res_description":error.message})
    }
    
}

/**
 * Modificar un documento de la coleccion cliente
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
 const putCliente = async (req,res) => {
    try {
        const data  = matchedData(req);
        console.log("req.body", data);
        console.log("req.params", req.params.id);
        const documento = await Cliente.findByIdAndUpdate(req.params.id,data)
        console.log("putCliente documento",documento)
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${req.params.id} actualizado`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({"res_description":error.message})
    }
    
}

/**
 * Modificar un documento de la coleccion cliente
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const deleteCliente = async (req,res) => {
    try {
        const { id }  = req.params;
        console.log("req.params", id);
        const documento = await Cliente.findByIdAndDelete(id)
        console.log("deleteCliente documento",documento)
        console.log(documento);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} eliminado`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({"res_description":error.message})
    }
    
}

module.exports = {
    getClientes,
    getCliente,
    postCliente,
    putCliente, 
    deleteCliente
}