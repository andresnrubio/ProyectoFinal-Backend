import express from "express";
const { Router } = express;
const router = Router();

import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import ordersController from "../../controllers/orders.controller.js"
const ordersControllerMethods = new ordersController()

router.post("/", ordersControllerMethods.createOrder);

router.post("/client", ordersControllerMethods.createOrderRedirect);

router.get("/:id", ordersControllerMethods.getOrderById);

router.delete("/:id", ordersControllerMethods.deleteOrderById);

export default router;

