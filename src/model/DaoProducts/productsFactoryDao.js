import productsDaoFs from "./productsDaoFs.js"
import ProductsDaoMongoDb from "./ProductsDaoMongoDb.js"

class productsFactoryDAO {
    static get(type) {
        switch (type) {
            case 'fs':
                return new productsDaoFs("./src/DB/fs/products.txt", [])
            case 'mongo':
                return new ProductsDaoMongoDb()
            default:
                return new productsDaoFs()
        }
    }
}   

export default productsFactoryDAO
