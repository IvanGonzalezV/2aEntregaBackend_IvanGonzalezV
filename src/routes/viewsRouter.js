import express from 'express';
import { productManagerDB } from '../dao/productManagerDB.js';

const router = express.Router();
const ProductDB = new productManagerDB();

router.get('/products', async (req, res) => {
    console.log('GET request received at /products');   // Console de prueba
    try {
        const queryParams = req.query; // Obtener los parámetros de la consulta
        const products = await ProductDB.getAllProducts(queryParams); // Llamar al método de la base de datos
        res.json(products); // Enviar la respuesta
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error al obtener productos'); // Manejo de errores
    }
});

export default router;
