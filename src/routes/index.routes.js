import express from "express";
const { Router } = express;

import routerApi from "./api/api.routes.js";
import routerUsers from "./users/users.routes.js";
import routerRender from "./home.routes.js"

import { validateToken } from "../middlewares/jwt/jwt.middleware.js";

const router = Router();

router.use("/", routerRender)
      .use("/api", validateToken, routerApi)
      .use("/", routerUsers)

export default router;
