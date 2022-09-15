import ContainerFs from "../../containers/ContainerFs.js";


class ProductsDaoFs extends ContainerFs {
    constructor(){
        super('./databases/fs/products.txt')
    }

}


export default ProductsDaoFs;