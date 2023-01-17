import express from "express";
const { Router } = express;
const router = Router();

import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import ordersController from "../../controllers/Orders.controller.js"
const ordersControllerMethods = new ordersController()

// router.get("/", authMiddleware, async (req,res)=>{
//   try {
//     res.render("cart", { layouts: "index", session: req.session });
//   } catch (error) {
//     res.send(error);
//   }
// })

router.post("/", ordersControllerMethods.createOrder);

router.get("/:id", ordersControllerMethods.getCartById);

router.get("/", ordersControllerMethods.getCartByBuyer);

router.delete("/:id", ordersControllerMethods.deleteOrderById);

export default router;
