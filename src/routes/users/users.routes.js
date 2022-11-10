import express from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";

const { Router } = express;
import passport from '../../middlewares/passport/passport.middleware.js';

const router = Router();


router.get("/login", authMiddleware, async (req, res) => {
  console.log('redirect')
  return res.status(200).redirect("/api/productos");
});


router.post("/login", passport.authenticate('login', 
  {failureRedirect: '/autherror'}
), (req, res) => {
  req.session.username = req.body.username;
  req.session.admin = true;
  res.status(200).redirect("/api/productos");
});


router.get("/signup", async (req, res) => {
  res.render("signup", { layouts: "index" });
});


router.post("/signup", passport.authenticate('signup', {
  failureRedirect: '/signuperror'
}), (req, res) => {
  req.session.username = req.body.username;
  req.session.admin = true;
  res.status(200).redirect("/api/productos");
})


router.get("/logout", authMiddleware, async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`);
      }
    });
    return res.status(200).redirect("/api/productos");
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/autherror", (req,res)=>{
  res.render("error", { layouts: "index", login: true });
})

router.get("/signuperror", (req,res)=>{
  res.render("error", { layouts: "index", signup: true });
})

export default router;
