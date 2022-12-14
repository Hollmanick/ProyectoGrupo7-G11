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
    categoria_id: {
        type: Schema.Types.ObjectId,
        ref: "Categoria"
    },
    mensaje_id: {
        type: Schema.Types.ObjectId,
        ref: "Mensaje"
    },
    alquiler_id: {
        type: Schema.Types.ObjectId,
        ref: "Alquiler"
    }
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Auto = mongoose.model("Auto", autoSchema);
module.exports = { Auto };