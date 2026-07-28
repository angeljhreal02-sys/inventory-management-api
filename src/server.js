// Carga las variables del archivo .env
// Ejemplo: PORT, MONGODB_URI
require("dotenv").config();


// Importamos la configuración de Express
const app = require("./app");


// Importamos la función que conecta MongoDB
const connectDB = require("./config/db");


// Ejecutamos la conexión antes de iniciar la API
connectDB();


// Puerto donde correrá nuestro servidor
// Si no existe usa 3000 por defecto
const PORT = process.env.PORT || 3000;


// Iniciamos el servidor HTTP
app.listen(PORT, () => {

    // Mensaje para confirmar que la API está funcionando
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);

});