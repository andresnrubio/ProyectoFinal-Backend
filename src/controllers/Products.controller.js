import { response } from 'express'
const { productsDao: productsContainer } = await import('../daos/index.js')


const getProducts = async (req, res = response) => {
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
  }

const addProduct = async (req, res = response) => {
    const timestamp = Date.now()
    let codigo = req.body.nombre.slice(0, 3) + timestamp;
    let product = {...req.body, codigo: codigo, timestamp:timestamp}
    let newProduct = await productsContainer.saveInFile(product);
    res.json({
      data: newProduct,
    });
  }

const updateProduct = async (req, res = response) => {
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
  }

  const deleteProduct = async (req, res = response) => {
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
  }

const  validateProduct = (req, res = response, next) => {
    const { nombre, descripcion, precio, foto, stock } = req.body;
  
    if (!nombre || !descripcion || !precio || !foto || !stock) {
      res.json({ Error: "Faltan datos del producto" });
    } else if (isNaN(precio)) {
      res.json({ Error: "El precio del producto debe ser de tipo number" });
    }else{
    req.nombre = nombre;
    req.descripcion = descripcion;
    req.precio = precio;
    req.foto = foto;
    req.stock = stock;
    next();
  }
  }

export{
    getProducts,
    addProduct, 
    updateProduct,
    deleteProduct,
    validateProduct
}