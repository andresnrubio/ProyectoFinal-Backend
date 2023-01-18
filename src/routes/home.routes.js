import express from "express";
const { Router } = express;
const router = Router();

import authMiddleware from "../middlewares/auth/auth.middleware.js";
import viewsController from "../controllers/Views.controller.js";
const viewsControllerMethods = new viewsController()

router.get("/home", authMiddleware, viewsControllerMethods.renderMain);

router.get("/cart", authMiddleware, viewsControllerMethods.renderCart)

router.get("/chat", authMiddleware, viewsControllerMethods.renderChat)
  
export default router;
