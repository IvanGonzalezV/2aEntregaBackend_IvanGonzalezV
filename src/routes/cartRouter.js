import { Router } from 'express';
import { productManagerDB } from '../dao/productManagerDB.js';
import { cartManagerDB } from '../dao/cartManagerDB.js';


const router = Router();
const ProductService = new productManagerDB('products.json');
const CartService = new cartManagerDB('carts.json', ProductService);

router.get('/:cid', async (req, res) => {

    try {
        const result = await CartService.getProductsFromCartByID(req.params.cid);
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

router.post('/', async (req, res) => {

    try {
        const result = await CartService.createCart();
        res.status(201).send({
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

router.post('/:cid/product/:pid', async (req, res) => {

    try {
        const result = await CartService.addProductByID(req.params.cid, req.params.pid)
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

export default router;