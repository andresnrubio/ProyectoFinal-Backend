import {
    response
} from 'express'
import CartDaoFs from '../daos/carts/CartsDaoFs.js';
const { cartDao: cartContainer, productsDao : productsContainer} = await import('../daos/index.js')


const createCart = async (req, res = response) => {
    try {
        let cart = {}
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
            data: cart.productos,
        })
    } catch {
        res.json({
            error: `Carrito no encontrado`,
        });
    }
}

const addProductsToCart = async (req, res = response) => {
    try{
        const productToAdd = await productsContainer.getById(req.body.id)
        const cart = await cartContainer.getById(req.params.id);
        if (!productToAdd) {
            res.json({
                error: `No existe producto con ese ID`,
            })
        } else {
            if (cart.products) {
                cart.products.push(productToAdd)
            } else {
                cart.products = [product]
            }}
       const newCart = await cartContainer.addProducts(req.params.id, cart.products)
       res.json({
        data: newCart.products,
    })
    }catch {
        res.json({
            error: `Error al agregar producto`,
        })
    }
}

const deleteProductInCart = async (req, res = response) => {
    const cart = await cartContainer.getById(req.params.id);
    const product = await productsContainer.getById(req.params.id_prod);
    if (product) {
        let newListProducts = [];
        newListProducts = cart.productos.filter(
            (producto) => producto.id != req.params.id_prod
        );
        cart.productos = newListProducts;
        await cartContainer.deleteById(req.params.id);
        await cartContainer.saveInFile(cart);

        res.json({
            msg: "Producto eliminado del carrito correctamente"
        });
    } else {
        res.json({
            msg: "Producto no existente"
        })
    }
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