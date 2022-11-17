import express from "express";
const { Router } = express;
const { cartDao: fileContainer } =  await import("../../daos/index.js")
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
const router = Router();

router.get("/", (req,res)=>{
  console.log("llegue")
})

router.post("/:id", async (req, res) => {
  console.log("miravaos")
});


export default router;
