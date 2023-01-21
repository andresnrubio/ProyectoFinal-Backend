import express from "express";
const { Router } = express;

import routerProducts from "../products/products.routes.js";
import routerCarts from "../cart/cart.routes.js";
import routerOrders from "../orders/orders.routes.js";
const router = Router();

router.use("/productos", routerProducts);
router.use("/cart", routerCarts);
router.use("/orders", routerOrders);

export default router;
