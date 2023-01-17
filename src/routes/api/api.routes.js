import express from "express";
const { Router } = express;

// import routerFaker from "../faker/productsFaker.routes.js";
import routerProducts from "../products/products.routes.js";
import routerCarts from "../cart/cart.routes.js";
import routerOrders from "../orders/orders.routes.js";

const router = Router();

router.use("/productos", routerProducts);
router.use("/cart", routerCarts);
router.use("/orders", routerOrders);
// router.use("/products-test", routerFaker);

export default router;
