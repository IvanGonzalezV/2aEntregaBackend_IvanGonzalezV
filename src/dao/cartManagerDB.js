import cartModel from './models/cartModel.js';
import productModel from './models/productModel.js';

class cartManagerDB {
    async getAllCarts() {
        try {
            const carts = await cartModel.find().lean();
            return carts;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al obtener los carritos');
        }
    }

    async getProductsFromCartByID(cid) {
        try {
            const cart = await cartModel.findById(cid).populate('products.product').lean();
            
            if (!cart) {
                throw new Error(`El carrito ${cid} no existe!`);
            }
            
            return cart.products;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al obtener los productos del carrito');
        }
    }

    async createCart() {
        try {
            const newCart = await cartModel.create({});
            return newCart;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al crear un nuevo carrito');
        }
    }

    async addProductByID(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);
            const product = await productModel.findById(pid);

            if (!cart || !product) {
                throw new Error('El carrito o el producto no existe');
            }

            cart.products.push({ product: pid });
            await cart.save();
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al agregar un producto al carrito');
        }
    }

    async removeProductByID(cid, pid) {
        try {
            const cart = await cartModel.findById(cid);

            if (!cart) {
                throw new Error(`El carrito ${cid} no existe`);
            }

            cart.products = cart.products.filter(item => item.product.toString() !== pid);
            await cart.save();
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al eliminar un producto del carrito');
        }
    }
}

export { cartManagerDB };
