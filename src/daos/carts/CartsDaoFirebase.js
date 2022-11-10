import ContainerFirebase from "../../containers/ContainerFirebase.js";

class CartsDaoFirebase extends ContainerFirebase {
    constructor() {
        super('carts')
    }

    newCart() {
        let cart = {}
        cart.timestamp = Date.now()
        cart.products = []
        return cart
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
            const updatedList = data.products.filter(product => product.id != idProductToDelete)
            this.updateById(idCart, {products: updatedList})
        })
        } catch (error) {
            throw new Error("Error al eliminar el producto del carrito");
        }
    }

}


export default CartsDaoFirebase;