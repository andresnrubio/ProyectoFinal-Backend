import ContainerMongoDb from '../../containers/ContainerMongoDb.js';
import mongoose from 'mongoose';
// import productModel from '../../databases/models/products.model.js'

//TODO aca se hace el llamado del schemma desde el model 

class ProductsDaoMongoDb extends ContainerMongoDb {
constructor(){
    super('products',
    {
        title:{
        type: String,
        required: true,
        trim: true,
        max: 50,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}
)
}



}

export default ProductsDaoMongoDb;

