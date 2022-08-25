const express = require("express");
const router = express.Router();
const productsRouter = require("./productsRouter.js");
const cartRouter = require("./cartRouter");

router.use("/productos", productsRouter);
router.use("/carrito", cartRouter);

module.exports = router;
