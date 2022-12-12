const { Score } = require("../models/Score.js")
const { matchedData } = require("express-validator");

/**
 * Listar todos los documentos de la coleccion score
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getScores = async (req, res) => {
    try {
        // Obtener todos los documentos existentes dentro de la coleccion score
        // const scores = await Score.find({}).lean();
        const scores = await Score.aggregate(
            [
                {   // Etapa coleccion alquileresConScore
                    $lookup: {
                        from: "alquileres", // nombre del schema o coleccion foranea
                        localField: "_id", // clave del documento local 
                        foreignField: "score_id", // clave del documento foraneo
                        as: "alquileresConScore" // nombre del campo a agregar
                    }
                }  
            ]
        )
        console.log("getScores", scores);
        res.status(200).json({
            "code_response": 200,
            "res_description": "documentos existentes dentro de la coleccion score",
            "data": scores
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }
}

/**
 * Encontrar un documento de la coleccion score por _id 
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getScore = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const score = await Score.findById(id);
        console.log(score);
        res.status(200).json({
            "code_response": 200,
            "res_description": `score para id: ${id}`,
            "data": score
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }
}

/**
 * Recupera el documento de la coleccion score cuyo id coincida y agrega un campo con los mensajes sus mensaje
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const getScoreCliente = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Score.aggregate(
            [
                {   // primera etapa
                    $match: {
                        _id: id // donde el campo id coincida
                    }
                },
                {   // segunda etapa
                    $lookup: {
                        from: "Score", // nombre del schema o coleccion foranea
                        localField: "_id", // clave del documento local 
                        foreingField: "score_id", // clave del documento foraneo
                        as: "scoreScore" // nombre del campo a agregar
                    }
                }
            ]
        )
        console.log("getScoreCliente documento", documento)
        console.log(documento);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} con sus score`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }
}

/**
 * Crear un nuevo documento en la coleccion score
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const postScore = async (req, res) => {
    try {
        const body = matchedData(req);
        console.log("req.body", body);
        const newScore = await Score.create(body);
        console.log(newScore);
        res.status(200).json({
            "code_response": 200,
            "res_description": "Documento Score creado"
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }
}

/**
 * Modificar un documento de la coleccion score
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const putScore = async (req, res) => {
    try {
        const data = matchedData(req);
        console.log("req", data.params, data.body);
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Score.findByIdAndUpdate(id, data, { new: true });
        console.log("putScore documento", documento)
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} actualizado`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ "res_description": error.message })
    }
}

/**
 * Modificar un documento de la coleccion score
 * @param {Request} req - Objeto que contiene propiedades de la peticion
 * @param {Response} res - Objeto que contiene propiedades de la respuesta
 */
const deleteScore = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("req.params", id);
        const documento = await Score.findByIdAndDelete(id)
        console.log("deleteScore documento", documento)
        console.log(documento);
        res.status(200).json({
            "code_response": 200,
            "res_description": `Documento id: ${id} eliminado`,
            "data": documento
        })
    } catch (error) {
        console.log(error.message)
        res.status(200).json({ "res_description": error.message })
    }
}

module.exports = {
    getScores,
    getScore,
    getScoreCliente,
    postScore,
    putScore,
    deleteScore
}