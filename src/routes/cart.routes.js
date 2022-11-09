import express from "express";
const router = express.Router();
const {
    createCart,
    deleteCartById,
    getCartById,
    addProductsToCart,
    deleteProductInCart
} = await import('../controllers/Cart.controller.js')

router.post("/", createCart);

router.delete("/:id", deleteCartById);

router.get("/:id/productos", getCartById);

router.post("/:id/productos", addProductsToCart);

router.delete("/:id/productos/:id_prod", deleteProductInCart);

export default router;