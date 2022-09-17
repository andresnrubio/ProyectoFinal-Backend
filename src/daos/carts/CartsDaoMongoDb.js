import ContainerMongoDb from '../../containers/ContainerMongoDb.js';
// import productModel from '../../databases/models/products.model.js'
//TODO aca se hace el llamado del schemma desde el model 

class CartsDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super('carts', {
            products: {
                type: Array,
                max: 100,
            }
        })
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
}

export default CartsDaoMongoDb;