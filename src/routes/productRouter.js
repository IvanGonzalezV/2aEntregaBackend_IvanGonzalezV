import { Router } from 'express';
import { productManagerDB } from '../dao/productManagerDB.js';

const router = Router();
const ProductService = new productManagerDB();

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const queryParams = {
            limit: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            sort: req.query.sort || '',
            query: req.query.query ? { category: req.query.query } : {}
        };

        const result = await ProductService.getAllProducts(queryParams);
        res.send({
            status: 'success',
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta para crear nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = req.body;
        const createdProduct = await ProductService.createProduct(newProduct);
        res.status(201).send({
            status: 'success',
            payload: createdProduct
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta para actualizar productos existentes
router.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await ProductService.updateProduct(productId, req.body);
        res.send({
            status: 'success',
            payload: updatedProduct
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

// Ruta para eliminar productos
router.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        await ProductService.deleteProduct(productId);
        res.send({
            status: 'success',
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

export default router;
