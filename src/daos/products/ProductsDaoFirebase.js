import ContainerFirebase from "../../containers/ContainerFirebase.js";

class ProductsDaoFirebase extends ContainerFirebase {
    constructor() {
        super('products')
    }

}


export default ProductsDaoFirebase;