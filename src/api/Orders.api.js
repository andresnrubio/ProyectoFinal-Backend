const { ordersDao: ordersContainer } = await import('../model/index.js')

class orderApiContainer {
 
createOrder = async (buyerEmail, products) =>{
    try {
        let newOrder = await ordersContainer.newOrder()
        newOrder.buyer = buyerEmail
        newOrder.items = []
        const order = await ordersContainer.saveInFile(newOrder)
        return order._id
    } catch (error) {
        throw new Error("Error al crear la orden");
    }
}

getById = async (id) => {
    try {
        let foundElement = await ordersContainer.getById(id);
            return foundElement;
    } catch (error) {
        throw new Error("Error al obtener orden");
    }
}

getByBuyer = async (buyer) => {
    try {
        let foundElement = await ordersContainer.findByBuyer(buyer);
            return foundElement;
    } catch (error) {
        throw new Error("Error al obtener orden");
    }
}

// addProduct = async (cartId, productId, username) => {
//     try {
//         if(cartId===' '){
//             this.createCart(username)
//         } else {
//             let cart = await ordersContainer.getById(cartId);
//             const productToAdd = await productsContainer.getById(productId)
//             if (!productToAdd) {
//                 return `No existe producto con ese ID`
//             } else {
//                 cart.products.push(productToAdd);
//                 await ordersContainer.updateById(cartId, cart)
//                 return cart
//             }
//         }
//     } catch (error) {
//         throw new Error("Error al agregar un producto");
//     }
// }

// deleteProduct = async (cartId, productId) => {
//     try {
//         let cart = await ordersContainer.getById(cartId);
//         cart.products = cart.products.filter((product) => product.id === productId);
//         await ordersContainer.updateById(cartId, cart)
//         return cart
//     } catch (error) {
//         throw new Error("Error al agregar un producto");
//     }
// }

deleteOrder = async (cartId) => {
    try {
        await ordersContainer.deleteById(cartId)
    } catch (error) {
        throw new Error("Error al agregar un producto");
    }
}

}

export default orderApiContainer