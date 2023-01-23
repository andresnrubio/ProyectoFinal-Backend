import cartApiContainer from "../api/carts.api.js"
import ordersApiContainer from "../api/orders.api.js"
import { avisoNuevaOrden } from "../utils/nodemailer.js"

const ordersAPI = new ordersApiContainer()
const cartsApi = new cartApiContainer()
class ordersController {
 
    createOrder = async (req, res) => {
        try {
            const cart = await cartsApi.getById(req.body.cartId)
            const order = await ordersAPI.createOrder(cart)
            await cartsApi.deleteCart(req.body.cartId)
            avisoNuevaOrden(order)
            res.json({data: order})
        } catch (error) {
            res.status(500).json({
                msg: "No se pudo crear la orden"
            })
        }
    }

    createOrderRedirect = async (req, res) => {
        try {
            const cart = await cartsApi.getById(req.body.cartId)
            const order = await ordersAPI.createOrder(cart)
            await cartsApi.deleteCart(req.body.cartId)
            avisoNuevaOrden(order)
            res.redirect("/orders")
        } catch (error) {
            res.status(500).json({
                msg: "No se pudo crear la orden"
            })
        }
    }
    
    getOrderById = async (req, res) => {
        try {
            const order = await ordersAPI.getById(req.params.id);
            res.json({
                data: order,
            })
        } catch (error){
            res.json({
                error: `Orden no encontrada`,
            });
        }
    }

    
    deleteOrderById = async (req, res) => {
        try {
            await ordersAPI.deleteOrder(req.params.id);
            res.json({
                msg: `Orden Eliminada`,
            });
        } catch (error){
            res.json({
                error: `Orden no encontrada`,
            });
        }
    }

}


export default ordersController
