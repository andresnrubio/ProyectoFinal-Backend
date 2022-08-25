const express = require("express");
const productsContainer = require("../controllers/productHandler.js");
const router = express.Router();

let userAdmin = false;

function validateProduct(req, res, next) {
  const { title, description, price, img, stock } = req.body;

  if (!title || !description || !price || !img || !stock) {
    res.json({ Error: "Faltan datos del producto" });
  } else if (isNaN(price)) {
    res.json({ Error: "El precio del producto debe ser de tipo number" });
  }else{
  req.title = title;
  req.description = description;
  req.price = price;
  req.img = img;
  req.stock = stock;
  next();
}
}

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

router.get("/:id?", async (req, res) => {
  if (!req.params.id) {
    let products = await productsContainer.getAllFile();
    res.json({
      data: products,
    });
  } else {
    let foundProduct = await productsContainer.getById(Number(req.params.id));
    if (!foundProduct) {
      res.status(404).json({
        error: "NOT FOUND 404 !! no existe ese ID",
      });
    } else {
      res.json({
        data: foundProduct,
      });
    }
  }
});

router.post("/", validateAdmin, validateProduct, async (req, res) => {
  const timestamp = Date.now()
  let codigo = req.body.title.slice(0, 3) + timestamp;
  let product = {...req.body, codigo: codigo, timestamp:timestamp}
  let newProduct = await productsContainer.saveInFile(product);
  res.json({
    data: newProduct,
  });
});

router.put("/:id", validateAdmin, async (req, res) => {
  let foundProduct = await productsContainer.getById(Number(req.params.id));
  if (!foundProduct) {
    res.status(404).json({
      error: "NOT FOUND 404!! producto no encontrado!!",
    });
  } else {
    let newValues = req.body;
    for (const element in foundProduct) {
      for (const elem in newValues) {
        if (element === elem) {
          foundProduct[element] = newValues[elem];
        }
      }
    }
    foundProduct.timestamp = Date.now()
    await productsContainer.deleteById(Number(req.params.id));
    await productsContainer.saveInFile(foundProduct);

    res.json({
      msg: "El producto fue modificado correctamente",
    });
  }
});

router.delete("/:id", validateAdmin, async (req, res) => {
  let foundProduct = await productsContainer.getById(Number(req.params.id));
  if (!foundProduct) {
    res.status(404).json({
      error: "NOT FOUND 404!!! producto no encontrado",
    });
  } else {
    await productsContainer.deleteById(req.params.id);
    res.json({
      msg: "Se ha eliminado el producto correctamente",
    });
  }
});

module.exports = router;
