import ContainerFs from "../../containers/ContainerFs.js";

class ProductsDaoFs extends ContainerFs {
    constructor() {
        super('./src/databases/fs/products.txt')
    }

}


export default ProductsDaoFs;