import messagesDaoMongoDb from "./messagesDaoMongoDb.js"

class messagesFactoryDAO {
    static get(type) {
        switch (type) {
            // case 'fs':
            //     return new messagesDaoFs("./src/DB/fs/products.txt", [])
            case 'mongo':
                return new messagesDaoMongoDb()
            default:
                return new messagesDaoMongoDb()
        }
    }
}   

export default messagesFactoryDAO