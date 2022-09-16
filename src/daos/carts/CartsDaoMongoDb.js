import ContainerMongoDb from '../../containers/ContainerMongoDb.js';
// import productModel from '../../databases/models/products.model.js'
//TODO aca se hace el llamado del schemma desde el model 

class CartsDaoMongoDb extends ContainerMongoDb {
    constructor(){
    super('carts',
    {
        products:{
        type: Array,
        max: 100,
    }
}
)
}
async addProducts(idCart, newList){
try {
  const newCart = await this.updateById(idCart,{products: newList})
  return newCart
}catch (error){
    throw new Error("Error al agregar un producto al carrito : "+error);
}


}

}

export default CartsDaoMongoDb;