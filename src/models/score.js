const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const scoreSchema = new Schema({
    score:{
        type: Number,
        default: null,
    },
    descripcion:{
        type: String,
        required: true
    },
    alquiler:{
        type: Schema.Types.ObjectId,
        ref: 'Alquiler',
        default: null
    }
});

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
    auto: {
        type: Schema.ObjectId,
        ref: "Auto"
    },
    cliente: {
        type: Schema.ObjectId,
        ref: "Cliente"
    },
    score: {
        type: Schema.ObjectId,
        ref: "Score"
    },
    score:[scoreSchema]
});

/**
 * Metodo sincrono para comparar contraseña enviada en peticion y la guardada en la db
 * @param {String} password - Contraseña a comparar
 * @returns {Promise}
 */
scoreSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.contrasena);
}

/**
 * Metodo sincrono ejecutado antes de guardar una contrasena en la base de datos para hashear
 */
scoreSchema.pre('save', async function(next) {
    const score = this
    if (!score.isModified('contrasena')) return next();
    try {
        // instancia de bcrypt para definir el salt que se usara para hashear la contraseña
        const salt = await bcrypt.genSaltSync(10);
        // hashear  contraseña
        const hash = await bcrypt.hash(score.contrasena, salt);
        // definir la contraseña hasheada al campo contrasena del esquema
        score.contrasena = hash;
        next();
    } catch (error) {
        console.log(`hay un error al hashear la contraseña ${error}`);
        next();
    }
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Score = mongoose.model('Score', scoreSchema);
module.exports = {Score};