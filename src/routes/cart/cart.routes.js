import express from "express";
const { Router } = express;
const { cartDao: fileContainer } =  await import("../../daos/index.js")
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
const router = Router();

router.get("/", authMiddleware, async (req,res)=>{
  try {
    res.render("cart", { layouts: "index", session: req.session });
  } catch (error) {
    res.send(error);
  }
})

// router.post("/:id", async (req, res) => {
//   if (!req.session.cart){
//     req.session.cart = {}
//   }
// });


export default router;
