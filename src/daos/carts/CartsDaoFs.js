import ContainerFs from "../../containers/ContainerFs.js";


class CartDaoFs extends ContainerFs {
    constructor() {
        super('./src/databases/fs/carts.txt')
    }

    newCart() {
        let cart = {}
        cart.timestamp = Date.now()
        cart.products = []
        return cart
    }

    async changeCartProducts(idCart, newProductsList) {
        try {
            const cart = await this.getById(idCart);
            cart.products = newProductsList
            await this.deleteById(idCart);
            await this.saveInFile(cart);
            return cart

        } catch (error) {
            throw new Error("Error al agregar un producto al carrito : " + error);
        }
    }

    async delCartProducts(idCart, idProductToDelete) {
        try {
            const cart = await this.getById(idCart);
                let newListProducts = [];
                newListProducts = cart.products.filter(
                    (product) => {
                        product.id != idProductToDelete
                    }
                );
            this.changeCartProducts(idCart, newListProducts)
            return newListProducts
        } catch (error) {
            throw new Error("Error al eliminar el producto del carrito");
        }

    }

}

export default CartDaoFs;