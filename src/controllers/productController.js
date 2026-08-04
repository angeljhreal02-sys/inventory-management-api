// Importamos el modelo Product para poder realizar operaciones en MongoDB
const Product = require("../models/Product");


/*
====================================================
Crear un nuevo producto
Método: POST
Ruta: /api/products
====================================================
*/
const createProduct = async (req, res) => {

    try {

        // Extraemos los datos enviados por el cliente
        // req.body contiene la información enviada desde Postman o un frontend
        const {
            name,
            sku,
            category,
            quantity,
            price,
            location,
            supplier
        } = req.body;


        // Creamos una nueva instancia del modelo Product
        const product = new Product({
            name,
            sku,
            category,
            quantity,
            price,
            location,
            supplier
        });


        // Guardamos el producto en MongoDB
        await product.save();


        // Respondemos con código 201 (Created)
        res.status(201).json({
            success: true,
            message: "Producto creado correctamente",
            data: product
        });

    } catch (error) {

        // Si ocurre cualquier error, respondemos con código 500
        res.status(500).json({

            success: false,

            message: "Error al crear el producto",

            error: error.message

        });

    }

};


/*
====================================================
Obtener todos los productos
Método: GET
Ruta: /api/products
====================================================
*/
const getProducts = async (req, res) => {

    try {

        // Busca todos los documentos de la colección "products"
        const products = await Product.find();

        // Responde con código HTTP 200 y la lista de productos
        res.status(200).json({
            success: true,
            total: products.length, // Cantidad de productos encontrados
            data: products
        });

    } catch (error) {

        // Si ocurre un error durante la consulta
        res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: error.message
        });

    }

};

// Exportamos las funciones del controlador
// Más adelante agregaremos:
// getProductById()
// updateProduct()
// deleteProduct()
module.exports = {

    createProduct,
    getProducts
};