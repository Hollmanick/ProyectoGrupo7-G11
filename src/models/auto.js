const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    año: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria_id: {},
    mensaje_id: {},
    alquiler_id: {}    
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Auto = mongoose.model("Auto", autoSchema);
module.exports = { Auto };