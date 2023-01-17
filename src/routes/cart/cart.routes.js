import express from "express";
const { Router } = express;
const router = Router();

import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import cartsController from "../../controllers/Carts.controller.js"
const cartsControllerMethods = new cartsController()

router.get("/", authMiddleware, async (req,res)=>{
  try {
    res.render("cart", { layouts: "index", session: req.session });
  } catch (error) {
    res.send(error);
  }
})

router.post("/", cartsControllerMethods.createCart);

router.delete("/:id", cartsControllerMethods.deleteCartById);

router.get("/:id/productos", cartsControllerMethods.getCartById);

router.post("/:id/productos", cartsControllerMethods.addProductsToCart);

router.delete("/:id/productos/:id_prod", cartsControllerMethods.deleteProductFromCart);

export default router;

