const express = require('express');
// cors es un middleware que nos permite acceder a nuestra API desde otro dominio, cors esta basado en la politica de origenes cruzados del navegador 
const cors = require('cors');
const app = express();
// dotenv permite usar variables de entorno .env para mantener a salvo datos sensibles
require('dotenv').config();
const port = process.env.PORT || 3000;
const { dbConnection } = require('./database/conexion.js');

// middlewares
app.use(cors());
app.use(express.json());

// rutas
app.use('/api/alquileres', require('./routes/alquiler.js'));
// app.use('/api/autos', require('./routes/auto.js'));
// app.use('/api/categorias', require('./routes/categoria.js'));
// app.use('/api/clientes', require('./routes/cliente.js'));
// app.use('/api/mensajes', require('./routes/mensaje.js'));
// app.use('/api/scores', require('./routes/score.js'));

app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port} 🚀`);
})
dbConnection();