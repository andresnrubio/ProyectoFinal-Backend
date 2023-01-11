import productsDaoFs from "./productsDaoFs.js"

class productsFactoryDAO {
    static get(type) {
        switch (type) {
            case 'fs':
                return new productsDaoFs("./src/DB/fs/products.txt", [])
            // case 'MONGO':
            //     return new NoticiasDBMongoDAO('miBase', 'noticias')
            default:
                return new productsDaoFs()
        }
    }
}   

export default productsFactoryDAO
