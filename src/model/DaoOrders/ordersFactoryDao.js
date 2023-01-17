import OrdersDaoMongoDb from "./OrdersDaoMongoDb.js"

class OrdersFactoryDAO {
    static get(type) {
        switch (type) {
            case 'fs':
                return new productsDaoFs("./src/DB/fs/products.txt", [])
            case 'mongo':
                return new OrdersDaoMongoDb()
            default:
                return new productsDaoFs()
        }
    }
}   

export default OrdersFactoryDAO
