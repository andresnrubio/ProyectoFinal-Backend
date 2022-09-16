import { response } from 'express'
const { productsDao: productsContainer } = await import('../daos/index.js')


const getProducts = async (req, res = response) => {
    if (!req.params.id) {
      let products = await productsContainer.getAllFile();
      res.json({
        data: products,
      });
    } else {
      let foundProduct = await productsContainer.getById(req.params.id);
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
    let codigo = req.body.title.slice(0, 3) + timestamp;
    let product = {...req.body, codigo: codigo, timestamp:timestamp}
    let newProduct = await productsContainer.saveInFile(product);
    res.json({
      data: newProduct,
    });
  }

const updateProduct = async (req, res = response) => {
    productsContainer.updateById(req.params.id, req.body)
      res.json({
        msg: "El producto fue modificado correctamente",
      });
    }
  

  const deleteProduct = async (req, res = response) => {
      productsContainer.deleteById(req.params.id)
      res.json({
        msg: "Se ha eliminado el producto correctamente",
      });
    
  }

const  validateProduct = (req, res = response, next) => {
    const { title, description, price, thumbnail, stock } = req.body;
  
    if (!title || !description || !price || !thumbnail || !stock) {
      res.json({ Error: "Faltan datos del producto" });
    } else if (isNaN(price)) {
      res.json({ Error: "El precio del producto debe ser de tipo number" });
    }else{
    req.title = title;
    req.description = description;
    req.price = price;
    req.thumbnail = thumbnail;
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