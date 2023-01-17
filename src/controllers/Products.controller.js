import productsApiContainer from "../api/Products.api.js"

const API = new productsApiContainer()
class productsController {

renderMain = async (req, res) => {
    try {
        let products = await API.getAllFile();  
        res.render("main", { products, session: req.session })
    } catch (error) {
        res.send(error);
    }
}

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
      await API.saveProduct(req.body);
      // res.render("main", { layouts: "index" });
      // res.render("layouts/index", { listProducts: false });
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
