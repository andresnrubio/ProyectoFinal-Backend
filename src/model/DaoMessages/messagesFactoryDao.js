import MessagesDaoMongoDb from "./MessagesDaoMongoDb.js"

class messagesFactoryDAO {
    static get(type) {
        switch (type) {
            case 'fs':
                return new productsDaoFs("./src/DB/fs/products.txt", [])
            case 'mongo':
                return new MessagesDaoMongoDb()
            default:
                return new productsDaoFs()
        }
    }
}   

export default messagesFactoryDAO
