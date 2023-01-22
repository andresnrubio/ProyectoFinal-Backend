import cartsDaoFs from "./cartsDaoFs.js"
import cartsDaoMongoDb from "./cartsDaoMongoDb.js"

class cartsFactoryDAO {
    static get(type) {
        switch (type) {
            case 'fs':
                return new cartsDaoFs("./src/DB/fs/carts.txt", [])
            case 'mongo':
                return new cartsDaoMongoDb()
            default:
                return new cartsDaoMongoDb()
        }
    }
}   

export default cartsFactoryDAO
