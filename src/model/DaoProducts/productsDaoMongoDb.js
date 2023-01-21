import containerMongoDb from '../../containers/containerMongoDb.js';
import mongoose from 'mongoose'
class productsDaoMongoDb extends containerMongoDb {
    constructor(){
    let modelSchema = new mongoose.Schema({
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
        },
        category: {
            type: String,
        }
    },
    { timestamps: true })
    super('products', modelSchema )
}}

export default productsDaoMongoDb;
