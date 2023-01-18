import cartApiContainer from "../api/Carts.api.js"
import orderApiContainer from "../api/Orders.api.js"
import productsApiContainer from "../api/Products.api.js"
import {addQuantity} from "../utils/utils.js"
const productsAPI = new productsApiContainer()
const cartsAPI = new cartApiContainer()
const ordersAPI = new orderApiContainer()

class viewsController {

renderMain = async (req, res) => {
    try {
        const cartId = await cartsAPI.checkUserCart(req.session.username)
        const products = await productsAPI.getAllFile();
        res.render("main", { layouts: "index", products, session: req.session, cartId })
    } catch (error) {
        res.send(error);
    }
}

renderCart = async (req,res)=>{
    try {
        const cartId = await cartsAPI.checkUserCart(req.session.username)
        const { products: cartsProducts } = await cartsAPI.getCartByUser(req.session.username)
        const orders = await ordersAPI.getByBuyer(req.session.username)
        res.render("cart", { layouts: "index", cartsProducts: addQuantity(cartsProducts), session: req.session, cartId, orders});
    } catch (error) {
        res.send(error);
    }
}

renderOrders = async (req,res)=>{
    try {
        const orders = await ordersAPI.getByBuyer(req.session.username)
        res.render("orders", { layouts: "index", session: req.session, orders});
    } catch (error) {
        res.send(error);
    }
}

renderChat = (req, res) => {
    res.render("chatView", { layouts: "index", session: req.session});
}

}

export default viewsController
    