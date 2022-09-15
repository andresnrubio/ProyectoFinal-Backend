import ContainerFs from "../../containers/ContainerFs.js";


class CartDaoFs extends ContainerFs {
    constructor(){
        super('./src/databases/fs/carts.txt')
    }

}

export default CartDaoFs;