import productsDaoFs from "./productsDaoFs.js"
import productsDaoMongoDb from "./productsDaoMongoDb.js"

class productsFactoryDAO {
    static get(type) {
        switch (type) {
            case 'fs':
                return new productsDaoFs("./src/DB/fs/products.txt", [])
            case 'mongo':
                return new productsDaoMongoDb()
            default:
                return new productsDaoMongoDb()
        }
    }
}   

export default productsFactoryDAO

