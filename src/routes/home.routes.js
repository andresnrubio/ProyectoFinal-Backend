import express from "express";
const { Router } = express;
const router = Router();

import authMiddleware from "../middlewares/auth/auth.middleware.js";
import viewsController from "../controllers/views.controller.js";
const viewsControllerMethods = new viewsController()

router.get("/home", authMiddleware, viewsControllerMethods.renderMain);

router.get("/cart", authMiddleware, viewsControllerMethods.renderCart)

router.get("/orders", authMiddleware, viewsControllerMethods.renderOrders)

router.get("/chat", authMiddleware, viewsControllerMethods.renderChat)
  
router.get("/info", viewsControllerMethods.renderInfo)

export default router;

