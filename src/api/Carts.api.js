const { cartsDao: cartContainer, productsDao: productsContainer } = await import('../model/index.js')

class cartApiContainer {
 
createCart = async (username) =>{
    try {
        let newCart = await cartContainer.newCart()
        newCart.username = username
        const carts = await cartContainer.saveInFile(newCart)
        return carts._id
    } catch (error) {
        throw new Error("Error al crear el carrito");
    }
    }

getById = async (id) => {
    try {
        let foundElement = await cartContainer.getById(id);
            return foundElement;
    } catch (error) {
        throw new Error("Error al obtener id");
    }
}


addProduct = async (cartId, productId, username) => {
    try {
        if(cartId===' '){
            this.createCart(username)
        } else {
            let cart = await cartContainer.getById(cartId);
            const productToAdd = await productsContainer.getById(productId)
            if (!productToAdd) {
                return `No existe producto con ese ID`
            } else {
                cart.products.push(productToAdd);
                await cartContainer.updateById(cartId, cart)
                return cart
            }
        }
    } catch (error) {
        throw new Error("Error al agregar un producto");
    }
}

deleteProduct = async (cartId, productId) => {
    try {
        let cart = await cartContainer.getById(cartId);
        cart.products = cart.products.filter((product) => product.id === productId);
        await cartContainer.updateById(cartId, cart)
        return cart
    } catch (error) {
        throw new Error("Error al agregar un producto");
    }
}

deleteCart = async (cartId) => {
    try {
        await cartContainer.deleteById(cartId)
    } catch (error) {
        throw new Error("Error al agregar un producto");
    }
}

}

export default cartApiContainer