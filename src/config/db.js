// Importamos mongoose para poder conectarnos y trabajar con MongoDB
const mongoose = require("mongoose");


// Función encargada de iniciar la conexión con la base de datos
const connectDB = async () => {

    try {

        // Utiliza la URL almacenada en .env para conectarse a MongoDB
        await mongoose.connect(process.env.MONGODB_URI);


        // Mensaje de confirmación cuando la conexión funciona correctamente
        console.log("✅ MongoDB conectado");


    } catch (error) {


        // Muestra el error si MongoDB no puede conectarse
        console.error("Error conectando MongoDB:", error.message);


        // Detiene la aplicación porque sin base de datos no puede funcionar
        process.exit(1);
    }
};


// Exportamos la función para usarla en server.js
module.exports = connectDB;