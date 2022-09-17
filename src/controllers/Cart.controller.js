import {
    response
} from 'express'
const {
    cartDao: cartContainer,
    productsDao: productsContainer
} = await import('../daos/index.js')


const createCart = async (req, res = response) => {
    try {
        let cart = cartContainer.newCart();
        let cartWithId = await cartContainer.saveInFile(cart);
        res.json({
            id: cartWithId.id,
        });
    } catch {
        res.json({
            msg: "No se pudo crear el cart"
        })
    }
}

const getCartById = async (req, res = response) => {
    try {
        const cart = await cartContainer.getById(req.params.id);
        res.json({
            data: cart.products,
        })
    } catch {
        res.json({
            error: `Carrito no encontrado`,
        });
    }
}

const addProductsToCart = async (req, res = response) => {
    try {
        const productToAdd = await productsContainer.getById(req.body.id)
        const cart = await cartContainer.getById(req.params.id);
        if (!productToAdd) {
            res.json({
                error: `No existe producto con ese ID`,
            })
        } else {
            cart.products.push(productToAdd)
        }
        const newCart = await cartContainer.changeCartProducts(req.params.id, cart.products)
        res.json({
            data: newCart.products,
        })
    } catch {
        res.json({
            error: `Error al agregar producto`,
        })
    }
}

const deleteProductInCart = async (req, res = response) => {
    //TODO desde aca enviar id y productos con nuevo array lista de productos {products:[{},{}]}
    await cartContainer.delCartProducts(req.params.id, req.params.id_prod)
    res.json({
        msg: "Producto eliminado del carrito correctamente"
    });
}



const deleteCartById = async (req, res = response) => {
    try {
        await cartContainer.deleteById(req.params.id);
        res.json({
            msg: `Carrito Eliminado`,
        });
    } catch {
        res.json({
            error: `Carrito no encontrado`,
        });
    }
}

export {
    createCart,
    deleteCartById,
    getCartById,
    addProductsToCart,
    deleteProductInCart
}