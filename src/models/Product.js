// Importamos mongoose para poder crear esquemas y modelos de MongoDB
const mongoose = require("mongoose");


// Creamos la estructura que tendrán los documentos dentro de la colección products
const productSchema = new mongoose.Schema({

    // Nombre del producto
    name: {
        type: String, // Define que será texto
        required: true // Obliga a que el campo exista
    },


    // Código único del producto
    // Ejemplo: INV-001
    sku: {
        type: String, // Guarda texto
        required: true, // Es obligatorio
        unique: true // Evita productos con el mismo código
    },


    // Categoría del producto
    category: {
        type: String,
        required: true
    },


    // Cantidad disponible en inventario
    quantity: {
        type: Number, // Guarda números
        required: true,
        default: 0 // Si no se envía, empieza en 0
    },


    // Precio del producto
    price: {
        type: Number,
        required: true
    },


    // Ubicación física del producto
    // Ejemplo: Almacén A, Rack 3
    location: {
        type: String,
        required: true
    },


    // Proveedor del producto
    supplier: {
        type: String,
        required: true
    }

},
{
    // Agrega automáticamente:
    // createdAt: fecha de creación
    // updatedAt: fecha de modificación
    timestamps: true
});



// Creamos el modelo Product basado en nuestro esquema
// Este modelo permite hacer consultas:
// Product.find()
// Product.create()
// Product.deleteOne()
// Product.updateOne()
const Product = mongoose.model(
    "Product",
    productSchema
);


// Exportamos el modelo para usarlo en controllers
module.exports = Product;