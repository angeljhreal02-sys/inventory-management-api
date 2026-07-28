// Importamos Express para crear nuestro servidor API
const express = require("express");


// Permite aceptar peticiones desde otros dominios
// Ejemplo: un frontend separado consumiendo esta API
const cors = require("cors");


// Creamos la aplicación Express
const app = express();


// Middleware que permite recibir información en formato JSON
// Necesario para leer datos enviados desde Postman o Frontend
app.use(express.json());


// Habilita comunicación entre diferentes aplicaciones
app.use(cors());


// Exportamos la configuración de Express
// server.js será quien levante el servidor
module.exports = app;