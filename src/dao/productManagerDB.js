import productModel from './models/productModel.js';

class productManagerDB {
    async getAllProducts(queryParams) {
        const { limit = 10, page = 1, sort, query } = queryParams || {}; // Valores predeterminados y manejo de desestructuración
        const skip = (page - 1) * limit;

        try {
            const products = await productModel.find(query)
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .lean(); // Usar lean() para obtener objetos JSON planos

            return products; // Devolver los productos obtenidos
        } catch (error) {
            console.error(error.message);
            throw new Error("Error al buscar los productos"); // Lanzar un error si ocurre algún problema
        }
    }

    async getProductByID(pid) {
        const product = await productModel.findOne({_id: pid});

        if (!product) throw new Error(`El producto ${pid} no existe!`);

        return product;
    }

    async createProduct(product) {
        const {title, description, code, price, stock, category, thumbnails} = product;

        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error('Error al crear el producto');
        }

        try {
            const result = await productModel.create({title, description, code, price, stock, category, thumbnails: thumbnails ?? []});
            return result;
        } catch (error) {
            console.error(error.message);
            throw new Error('Error al crear el producto');
        }
    }

    async updateProduct(pid, productUpdate) {
        try {
            const result = await productModel.updateOne({_id: pid}, productUpdate);

            return result;
        } catch(error) {
            console.error(error.message);
            throw new Error('Error al actualizar el producto');
        }
    }

    async deleteProduct(pid) {
        try {
            const result = await productModel.deleteOne({_id: pid});

            if (result.deletedCount === 0) throw new Error(`El producto ${pid} no existe!`);

            return result;
        } catch(error) {
            console.error(error.message);
            throw new Error(`Error al eliminar el producto ${pid}`);
        }
    }
}

export { productManagerDB };