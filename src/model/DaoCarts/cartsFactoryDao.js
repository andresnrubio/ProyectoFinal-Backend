import cartsDaoFs from "./cartsDaoFs.js"
import CartsDaoMongoDb from "./CartsDaoMongoDb.js"

class cartsFactoryDAO {
    static get(type) {
        switch (type) {
            case 'fs':
                return new cartsDaoFs("./src/DB/fs/carts.txt", [])
            case 'mongo':
                return new CartsDaoMongoDb()
            default:
                return new cartsDaoFs()
        }
    }
}   

export default cartsFactoryDAO
