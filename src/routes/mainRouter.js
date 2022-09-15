const router = express.Router();
import express from "express"
import productsRouter from "./productsRouter.js"
import cartRouter from "./cartRouter.js"

router.use("/productos", productsRouter);
router.use("/carrito", cartRouter);

export default router;
