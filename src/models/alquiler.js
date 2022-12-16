const mongoose = require("mongoose");
const { Schema } = mongoose;
const alquilerSchema = new Schema({
    fechaEntrega: {
        type: String,
        required: true
    },
    fechaDevolucion: {
        type: String,
        required: true
    },
    estatus: {
        type: String,
        required: true
    },
    auto_id: {
        type: Schema.Types.ObjectId,
        ref: "Auto"
    },
    cliente_id: {
        type: Schema.Types.ObjectId,
        ref: "Cliente"
    },
    score_id: {
        type: Schema.Types.ObjectId,
        ref: "Score"
    }
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Alquiler = mongoose.model("Alquiler", alquilerSchema);
module.exports = { Alquiler };