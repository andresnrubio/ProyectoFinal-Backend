import express from "express";
const router = express.Router();
// import cartContainer from "../daos/carts/CartsDaoFs.js";
// import productsContainer from "../daos/productHandler.js";

// router.post("/", async (req, res) => {
//   try{
//   let cart = { timestamp: Date.now() }
//   let cartWithId = await cartContainer.saveInFile(cart);
//   res.json({
//     id: cartWithId.id,
//   });}catch{
//     res.json({
//       msg:"No se pudo crear el cart"
//     })
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     await cartContainer.deleteById(Number(req.params.id));
//     res.json({
//       msg: `Carrito Eliminado`,
//     });
//   }
//   catch {
//     res.json({
//       error: `Carrito no encontrado`,
//     });
//   }
// });

// router.get("/:id/productos", async (req, res) => {
//   try {
//     const cart = await cartContainer.getById(Number(req.params.id));
//     res.json({
//       data: cart.productos,
//     })
//   }
//   catch {
//     res.json({
//       error: `Carrito no encontrado`,
//     });
//   }
// });

// router.post("/:id/productos", async (req, res) => {
//   try {
//     const cart = await cartContainer.getById(Number(req.params.id));
//     const product = await productsContainer.getById(Number(req.body.id));
//     if(!product){
//       res.json({
//         error: `No existe producto con ese ID`,
//       })
//     }else{
//        if (cart.productos) {
//         cart.productos.push(product)
//       } else {
//         cart.productos = [product]
//       }
//       await cartContainer.deleteById(Number(req.params.id));
//       await cartContainer.saveInFile(cart);
//       res.json({ msg: `Producto agregado al carrito ${req.params.id}` });
//     }
//   }
//   catch {  
//       res.json({
//         error: `Error al agregar producto`,
//       })
//   }
// });

// router.delete("/:id/productos/:id_prod", async (req, res) => {
//   const cart = await cartContainer.getById(Number(req.params.id));
//   const product = await productsContainer.getById(Number(req.params.id_prod));
//   if(product){
//   let newListProducts = [];
//   newListProducts = cart.productos.filter(
//     (producto) => producto.id != Number(req.params.id_prod)
//   );
//   cart.productos = newListProducts;
//   await cartContainer.deleteById(Number(req.params.id));
//   await cartContainer.saveInFile(cart);
 
//   res.json({msg:"Producto eliminado del carrito correctamente"});}
//   else{
//   res.json({msg:"Producto no existente"})
//   }
// });

export default router;
