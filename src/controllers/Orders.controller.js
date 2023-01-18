import cartApiContainer from "../api/Carts.api.js"
import ordersApiContainer from "../api/Orders.api.js"

const ordersAPI = new ordersApiContainer()
const cartsApi = new cartApiContainer()
class ordersController {
 
    createOrder = async (req, res) => {
        try {
            const cart = await cartsApi.getById(req.body.cartId)
            const orderId = await ordersAPI.createOrder(cart)
            await cartsApi.deleteCart(req.body.cartId)
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

    getOrderByBuyer = async (req, res) => {
        try {
            const data= []
            // const order = await ordersAPI.getByBuyer(req.session.user);
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
