import ordersDaoMongoDb from "./ordersDaoMongoDb.js"

class ordersFactoryDAO {
    static get(type) {
        switch (type) {
            // case 'fs':
            //     return new ordersDaoMongofs("./src/DB/fs/products.txt", [])
            case 'mongo':
                return new ordersDaoMongoDb()
            default:
                return new ordersDaoMongoDb()
        }
    }
}   

export default ordersFactoryDAO