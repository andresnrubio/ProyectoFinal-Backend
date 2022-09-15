import express from "express"
const router = express.Router();
const {getProducts, addProduct, updateProduct, deleteProduct, validateProduct } = await import('../controllers/Products.controller.js')

let userAdmin = false;

function validateAdmin(req, res, next) {
  if (userAdmin) {
    next();
  } else {
    res.status(403).json({ User: "No es Admin" });
  }
}

router.get("/login", (req, res) => {
  userAdmin = true;
  res.status(200).json({ User: "Admin" });
});

router.get("/logout", (req, res) => {
  userAdmin = false;
  res.status(200).json({ User: "No es Admin" });
});

router.get("/:id?", getProducts );

router.post("/", validateAdmin,  validateProduct,  addProduct);

router.put("/:id", validateAdmin, updateProduct);

router.delete("/:id", validateAdmin, deleteProduct);

export default router;
