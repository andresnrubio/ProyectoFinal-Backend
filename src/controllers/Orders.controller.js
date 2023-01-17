import ordersApiContainer from "../api/Orders.api.js"

const API = new ordersApiContainer()

class ordersController {
 
    createOrder = async (req, res) => {
        try {
            const orderId = await API.createOrder(req.session.username)
            res.json({
                id: orderId,
            });
        } catch {
            res.json({
                msg: "No se pudo crear la orden"
            })
        }
    }
    
    getCartById = async (req, res) => {
        try {
            const order = await API.getById(req.params.id);
            res.json({
                data: order,
            })
        } catch {
            res.json({
                error: `Orden no encontrada`,
            });
        }
    }

    getCartByBuyer = async (req, res) => {
        try {
            console.log(req.session)
            const data= []
            // const order = await API.getByBuyer(req.session.user);
            res.json({
                data: order,
            })
        } catch {
            res.json({
                error: `Orden no encontrada`,
            });
        }
    }
    
    // addProductsToCart = async (req, res) => {
    //     try {
    //         const response = await API.addProduct(req.params.id, req.body.product, req.session.username)
    //         res.json({ data: response });
    //     } catch {
    //         res.json({
    //             error: `Error al agregar producto`,
    //         })
    //     }
    // }
    
    // deleteProductFromCart = async (req, res) => {
    //     try {
    //         const response = await API.deleteProduct(req.params.id, req.params.id_prod)
    //         res.json({ data: response });
    //     } catch {
    //       res.json({
    //         msg: "Error al eliminar producto",
    //       });
    //     }
    //   };
    
    
    deleteOrderById = async (req, res) => {
        try {
            await API.deleteOrder(req.params.id);
            res.json({
                msg: `Orden Eliminada`,
            });
        } catch {
            res.json({
                error: `Orden no encontrada`,
            });
        }
    }

}


export default ordersController
