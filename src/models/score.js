const mongoose = require("mongoose");
const { Schema } = mongoose;
const scoreSchema = new Schema({
    score: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    alquiler_id: {}
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Score = mongoose.model("Score", scoreSchema);
module.exports = { Score };