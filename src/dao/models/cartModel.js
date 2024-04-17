import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product" // Referencia al modelo de productos
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;