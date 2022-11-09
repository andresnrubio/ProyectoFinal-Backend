const router = express.Router();
import express from "express"
import productsRouter from "./products.routes.js"
import cartRouter from "./cart.routes.js"
import usersRouter from "./users/users.routes.js"

router.use("/productos", productsRouter);
router.use("/carrito", cartRouter);
router.use("/users",usersRouter)

export default router;
