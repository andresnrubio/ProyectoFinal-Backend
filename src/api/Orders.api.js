const { ordersDao: ordersContainer } = await import('../model/index.js')
import {addQuantity} from "../utils/utils.js"
class orderApiContainer {
 
createOrder = async (products) =>{
    try {
        let newOrder = await ordersContainer.newOrder()
        newOrder.buyer = products.user
        newOrder.items = addQuantity(products.products)
        newOrder.address = "Av. siempre viva 123 - Springfield"
        const order = await ordersContainer.saveInFile(newOrder)
        //TODO enviar correo con orden generada
        return order.orderNumber
    } catch (error) {
        throw new Error("Error al crear la orden");
    }
}

getById = async (id) => {
    try {
        let foundElement = await ordersContainer.getById(id);
            return foundElement;
    } catch (error) {
        throw new Error("Error al obtener orden");
    }
}

getByBuyer = async (buyer) => {
    try {
        let foundElement = await ordersContainer.findByBuyer(buyer);
            return foundElement;
    } catch (error) {
        throw new Error("Error al obtener orden");
    }
}

deleteOrder = async (cartId) => {
    try {
        await ordersContainer.deleteById(cartId)
    } catch (error) {
        throw new Error("Error al agregar un producto");
    }
}

}

export default orderApiContainer