import productsApiContainer from "../api/products.api.js"

const API = new productsApiContainer()
class productsController {


getAll = async (req, res) => {
    try {
        let products = await API.getAllFile();
        res.json({
            data: products,
          });
    } catch (error) {
        res.send(error);
    }
}

getById = async (req, res) => {
    try {
      let productById = await API.getById(req.params.id);
      res.json(productById);
    } catch (error) {
      res.send(error);
    }
}

saveProduct = async (req, res) => {
    try {
      const data = await API.saveProduct(req.body);
      res.status(200).json(data)
    } catch (error) {
      res.send(error);
    }
}

updateProduct = async (req, res) => {
    try {
      let productById = await API.updateById(req.params.id, req.body);
      res.json({
        data: productById,
      });
    } catch (error) {
      res.send(error);
    }
}

deleteProduct =  async (req, res) => {
    try {
      const result = await API.deleteProduct(req.params.id);
      res.json({
        data: result,
      });
    } catch (error) {
      res.send(error);
    }
}

}


export default productsController
