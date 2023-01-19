import containerMongoDb from '../../containers/containerMongoDb.js';
import mongoose from 'mongoose'

class cartsDaoMongoDb extends containerMongoDb {
    constructor() {
        let modelSchema = new mongoose.Schema({
            products: {
                type: Array,
                max: 100,
            },
            email: {
                type: String,
                required: true,
            }},
        { timestamps: true })
        super('carts', modelSchema)
    }

    newCart() {
        return {}
    }

    async changeCartProducts(idCart, newProductsList) {
        try {
            const newCart = await this.updateById(idCart, {
                products: newProductsList
            })
            return newCart
        } catch (error) {
            throw new Error("Error al agregar un producto al carrito : " + error);
        }
    }

    async delCartProducts(idCart, idProductToDelete) {
        try {
        this.getById(idCart).then((data)=>{
            const updatedList = data.products.filter(product => product._id != idProductToDelete)
            this.updateById(idCart, {products: updatedList})
        })
        } catch (error) {
            throw new Error("Error al eliminar el producto del carrito");
        }
    }

    async findByBuyer(user){
        try {
            const cart = await this.collection.findOne({ user: user }).exec()
        return cart
    }
    catch (error) {
        throw new Error("Error al buscar el carrito")
    }
    }

}

export default cartsDaoMongoDb;