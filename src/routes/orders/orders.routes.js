import express from "express";
const { Router } = express;
const router = Router();

import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import ordersController from "../../controllers/Orders.controller.js"
const ordersControllerMethods = new ordersController()

router.post("/", ordersControllerMethods.createOrder);

router.get("/:id", ordersControllerMethods.getOrderById);

router.get("/", ordersControllerMethods.getOrderByBuyer);

router.delete("/:id", ordersControllerMethods.deleteOrderById);

export default router;
