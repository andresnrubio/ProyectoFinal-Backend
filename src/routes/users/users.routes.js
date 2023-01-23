import express from "express";
import authMiddleware from "../../middlewares/auth/auth.middleware.js";
import upload from "../../utils/multer.js";
const { Router } = express;
import { passport, usersCollection } from '../../middlewares/passport/passport.middleware.js';
import { avisoNuevoUsuario } from "../../utils/nodemailer.js";
import { sendJWTCookie, sendJWT, logout } from "../../middlewares/jwt/jwt.middleware.js";
const router = Router();

router.get("/login", authMiddleware, async (req, res) => {
  console.log('redirect')
  return res.status(200).redirect("/home");
});

router.post("/login", passport.authenticate('login', 
{failureRedirect: '/autherror'}
), (req, res) => {
  req.session.username = req.body.username;
  req.session.admin = true;
  sendJWT(req, res)
});

router.post("/loginForm", passport.authenticate('login', 
{failureRedirect: '/autherror'}
),sendJWTCookie, (req, res) => {
  req.session.username = req.body.username;
  req.session.admin = true;
  res.status(200).redirect("/home");
});

router.get("/signup", async (req, res) => {
  res.render("signup", { layouts: "index" });
});

router.post("/signup", passport.authenticate('signup', {
  failureRedirect: '/signuperror'
}), sendJWTCookie, (req, res) => {
  req.session.username = req.body.username;
  req.session.admin = true;
  avisoNuevoUsuario(req.body)
  // res.render("avatarUpload", { layouts: "index" });
  sendJWT(req, res)
})

router.post("/signup-client", passport.authenticate('signup', {
  failureRedirect: '/signuperror'
}), sendJWTCookie, (req, res) => {
  req.session.username = req.body.username;
  req.session.admin = true;
  avisoNuevoUsuario(req.body)
  // res.render("avatarUpload", { layouts: "index" });
  res.status(200).redirect("/home");
})


router.post("/logout", logout, (req, res) => {
  try {
    res.status(200)
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/logout", authMiddleware, logout, async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`);
      }
    });
    res.status(200).redirect("/home");
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

router.post("/uploadavatar", upload.single('avatar'), async (req, res, next) =>{
  const file = req.file
  if (!file){
    const error = new Error('Por favor cargue un archivo')
    error.httpStatusCode = 400
    return next(error)
  }
  await usersCollection.updateOne({username: `${req.session.username}`}, {avatar: file.filename })
  res.status(200).redirect("/home");
})
export default router;

