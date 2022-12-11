const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");
const alquilerSchema = new Schema({
    fechaEntrega: {
        type: String,
        required: true
    },
    fechaDevolucion: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    auto_id: {},
    cliente_id: {},
    score_id: {}
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Alquiler = mongoose.model("Alquiler", alquilerSchema);
module.exports = { Alquiler };