const { Cliente } = require('../models/cliente.js')
const { matchedData } = require('express-validator');

/**
 * Listar todos los documentos de la coleccion cliente
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getClientes = async (req,res) => {
    try {
        // Obtener todos los documentos existentes dentro de la coleccion cliente
        const clientes = await Cliente.find({}).lean();
        res.status(200).json({
            "code_response": 200,
            "res_description": 'documentos existentes dentro de la coleccion cliente',
            "data": clientes
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
 * Recupera el documento de la coleccion cliente cuyo id coincida y agrega un campo con los mensajes sus mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getMensajesCliente = async (req,res) => {
    try {
        const { id }  = req.params;
        console.log("req.params", id);
        const documento = await Cliente.aggregate(
            [
                // {   // primera etapa
                //     $match: {
                //         _id: id // donde el campo id coincida
                //     } 
                // },
                {   // segunda etapa
                    $lookup: {
                        from: 'mensajes', // nombre del schema o coleccion foranea
                        localField: '_id', // clave del documento local 
                        foreignField: 'cliente_id', // clave del documento foraneo
                        as: 'mensajesCliente' // nombre del campo a agregar
                    }
                }   
            ]
        )
        console.log("getMensajesCliente documento",documento)
        console.log(documento);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} con sus mensajes`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({"res_description":error.message})
    }
    
}

/**
 * Recupera el documento de la coleccion cliente cuyo id coincida y agrega un campo con los mensajes sus mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getAlquilerCliente = async (req,res) => {
    try {
        const { id }  = req.params;
        console.log("req.params", id);
        const documento = await Cliente.aggregate(
            [
                {   // primera etapa
                    $match: {
                        _id: id // donde el campo id coincida
                    } 
                },
                {   // segunda etapa
                    $lookup: {
                        from: 'Alquiler', // nombre del schema o coleccion foranea
                        localField: '_id', // clave del documento local 
                        foreingField: 'cliente_id', // clave del documento foraneo
                        as: 'alquilerCliente' // nombre del campo a agregar
                    }
                }   
            ]
        )
        console.log("getAlquilerCliente documento",documento)
        console.log(documento);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} con sus alquiler`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({"res_description":error.message})
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
            "res_description": "Documento Cliente creado"
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
        console.log("req", data.params, data.body);
        const documento = await Cliente.findByIdAndUpdate(Id,data)
        console.log("putCliente documento",documento)
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} actualizado`,
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
    getMensajesCliente,
    getAlquilerCliente,
    postCliente,
    putCliente, 
    deleteCliente
}