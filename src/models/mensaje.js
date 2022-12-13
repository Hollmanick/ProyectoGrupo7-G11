const mongoose = require("mongoose");
const { Schema } = mongoose;
const mensajeSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    auto_id: {},
    cliente_id: {}
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Mensaje = mongoose.model("Mensaje", mensajeSchema);
module.exports = { Mensaje };