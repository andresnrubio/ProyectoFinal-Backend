import express from "express";
const { Router } = express;

// import routerFaker from "../faker/productsFaker.routes.js";
import routerProducts from "../products/products.routes.js";

const router = Router();

router.use("/productos", routerProducts);
// router.use("/products-test", routerFaker);

export default router;
