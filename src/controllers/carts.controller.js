import cartApiContainer from "../api/carts.api.js";
const API = new cartApiContainer()

class cartsController {
 
createCart = async (req, res) => {
    try {
        const email = () =>{
            if (req.session.username){
                return req.session.username
            }else{
                return req.body.email
            }
        }
        const cartId = await API.createCart(email())
        res.json({
            id: cartId,
        });
    } catch {
        res.json({
            msg: "No se pudo crear el cart"
        })
    }
}

getCartById = async (req, res) => {
    try {
        const cart = await API.getById(req.params.id);
        res.json({
            data: cart.products,
        })
    } catch {
        res.json({
            error: `Carrito no encontrado`,
        });
    }
}

addProductsToCart = async (req, res) => {
    try {
        const response = await API.addProduct(req.params.id, req.body.id, req.session.username)
        res.status(200).json({response})
    } catch {
        res.json({
            error: `Error al agregar producto`,
        })
    }
}

deleteProductFromCart = async (req, res) => {
    try {
        const response = await API.deleteProduct(req.params.id, req.params.id_prod)
        res.json({ data: response });
    } catch {
      res.json({
        msg: "Error al eliminar producto",
      });
    }
  };


deleteCartById = async (req, res) => {
    try {
        await API.deleteCart(req.params.id);
        res.json({
            msg: `Carrito Eliminado`,
        });
    } catch {
        res.json({
            error: `Carrito no encontrado`,
        });
    }
}
}
export default cartsController
