const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const alquilerSchema = new Schema({
    fechaEntrega:{
        type: String,       
        required: true
    },
    fechaDevolucion:{
        type: String,        
        required: true        
    },
    status:{
        type: String,
        required: true
    },
    auto: {
        type: Schema.ObjectId,
        ref:"Auto"
    },
    cliente: {
        type: Schema.ObjectId,
        ref:"Cliente"
    },
    score: {
        type: Schema.ObjectId,
        ref:"Score"
    }   
})

/**
 * Metodo sincrono para comparar contraseña enviada en peticion y la guardada en la db
 * @param {String} password - Contraseña a comparar
 * @returns {Promise}
 */
alquilerSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.contrasena);
}

/**
 * Metodo sincrono ejecutado antes de guardar una contrasena en la base de datos para hashear
 */
alquilerSchema.pre('save', async function(next) {
    const alquiler = this
    if (!alquiler.isModified('contrasena')) return next();
    try {
        // instancia de bcrypt para definir el salt que se usara para hashear la contraseña
        const salt = await bcrypt.genSaltSync(10);
        // hashear  contraseña
        const hash = await bcrypt.hash(alquiler.contrasena, salt);
        // definir la contraseña hasheada al campo contrasena del esquema
        alquiler.contrasena = hash;
        next();
    } catch (error) {
        console.log(`hay un error al hashear la contraseña ${error}`);
        next();
    }
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Alquiler = mongoose.model('Alquiler', alquilerSchema);
module.exports = {Alquiler};