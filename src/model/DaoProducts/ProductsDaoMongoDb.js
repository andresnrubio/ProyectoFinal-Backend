import ContainerMongoDb from '../../containers/ContainerMongoDb.js';

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
        },
        code: {
            type: String,
            required: true
        }
    })
}}

export default ProductsDaoMongoDb;
