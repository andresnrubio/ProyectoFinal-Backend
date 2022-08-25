const express = require("express");
const router = express.Router();
const cartContainer = require("../controllers/cartHandler.js");
const productsContainer = require("../controllers/productHandler.js");

router.post("/", async (req, res) => {
  try{
  let cart = { timestamp: Date.now() }
  let cartWithId = await cartContainer.saveInFile(cart);
  res.json({
    id: cartWithId.id,
  });}catch{
    res.json({
      msg:"No se pudo crear el cart"
    })
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await cartContainer.deleteById(Number(req.params.id));
    res.json({
      msg: `Carrito Eliminado`,
    });
  }
  catch {
    res.json({
      error: `Carrito no encontrado`,
    });
  }
});

router.get("/:id/productos", async (req, res) => {
  try {
    const cart = await cartContainer.getById(Number(req.params.id));
    res.json({
      data: cart.products,
    })
  }
  catch {
    res.json({
      error: `Carrito no encontrado`,
    });
  }
});

router.post("/:id/productos", async (req, res) => {
  try {
    const cart = await cartContainer.getById(Number(req.params.id));
    const product = await productsContainer.getById(Number(req.body.id));
    if(!product){
      res.json({
        error: `No existe producto con ese ID`,
      })
    }else{
       if (cart.products) {
        cart.products.push(product)
      } else {
        cart.products = [product]
      }
      await cartContainer.deleteById(Number(req.params.id));
      await cartContainer.saveInFile(cart);
      res.json({ msg: `Producto agregado al carrito ${req.params.id}` });
    }
  }
  catch {  
      res.json({
        error: `Error al agregar producto`,
      })
  }
});

router.delete("/:id/productos/:id_prod", async (req, res) => {
  //ELIMINAR UN PRODUCTO DEL CARRITO POR SU ID DE CARRITO Y ID DE PRODUCTO
  const cart = await cartContainer.getById(Number(req.params.id));
  const product = await productsContainer.getById(Number(req.params.id));
  if(product){

  let newListProducts = [];
  newListProducts = cart.products.filter(
    (product) => product.id != Number(req.params.id_prod)
  );
  cart.products = newListProducts;
  await cartContainer.deleteById(Number(req.params.id));
  await cartContainer.saveInFile(cart);
 
  res.json({msg:"Producto eliminado del carrito correctamente"});}
  else{
  res.json({msg:"Producto no existente"})
  }
});

module.exports = router;
