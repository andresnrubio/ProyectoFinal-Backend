import express from "express";
const { Router } = express;

import routerApi from "./api/api.routes.js";
import routerUsers from "./users/users.routes.js";
import routerRender from "./home.routes.js"

const router = Router();

router.use("/", routerRender)
      .use("/api", routerApi)
      .use("/", routerUsers)


export default router;
