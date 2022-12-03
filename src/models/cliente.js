const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');
const clienteSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    contrasena:{
        type: String,
        required: true,
        unique: true,
        index: {unique: true}
    },
    nombre:{
        type: String,
        required: true
    },
    edad:{
        type: String,
        default: null
    },
    mensajes:{
        type: Schema.Types.ObjectId,
        ref: 'Mensajes',
        default: false
    },
    alquiler:{
        type: Schema.Types.ObjectId,
        ref: 'Alquiler',
        default: null
    }

})

/**
 * Metodo sincrono para comparar contraseña enviada en peticion y la guardada en la db
 * @param {String} password - Contraseña a comparar
 * @returns {Promise}
 */
clienteSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.contrasena);
}

/**
 * Metodo sincrono ejecutado antes de guardar una contrasena en la base de datos para hashear
 */
clienteSchema.pre('save', async function(next) {
    const user = this
    if (!user.isModified('contrasena')) return next();
    try {
        // instancia de bcrypt para definir el salt que se usara para hashear la contraseña
        const salt = await bcrypt.genSaltSync(10);
        // hashear  contraseña
        const hash = await bcrypt.hash(user.contrasena, salt);
        // definir la contraseña hasheada al campo contrasena del esquema
        user.contrasena = hash;
        next();
    } catch (error) {
        console.log(`hay un error al hashear la contraseña ${error}`);
        next();
    }
})

// Definir el nombre del modelo y exportarlo usando module.exports
const Cliente = mongoose.model('Cliente', clienteSchema);
module.exports = {Cliente};