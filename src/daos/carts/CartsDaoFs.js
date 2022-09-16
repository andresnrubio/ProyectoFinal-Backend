import ContainerFs from "../../containers/ContainerFs.js";


class CartDaoFs extends ContainerFs {
    constructor(){
        super('./src/databases/fs/carts.txt')
    }

async addProducts(idCart, newProductsList){
    try {
        const cart = await cartContainer.getById(idCart);
        console.log(idCart)
        console.log(newProductsList)
        // const product = await productsContainer.getById(idProduct);
        // if (!product) {
        //     res.json({
        //         error: `No existe producto con ese ID`,
        //     })
        // } else {
        //     if (cart.products) {
        //         cart.products.push(product)
        //     } else {
        //         cart.products = [product]
        //     }

            cart.products = newProductsList
            await cartContainer.deleteById(idCart);
            await cartContainer.saveInFile(cart);
            res.json({
                msg: `Producto agregado al carrito ${idCart}`
            });
        }
    catch (error){
        throw new Error("Error al agregar un producto al carrito : "+error);
    }
}

}

export default CartDaoFs;