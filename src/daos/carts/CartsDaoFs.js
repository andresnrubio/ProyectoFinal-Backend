import ContainerFs from "../../containers/ContainerFs.js";


class CartDaoFs extends ContainerFs {
    constructor(){
        super('./database/fs/carts.txt')
    }

}

export default CartDaoFs;