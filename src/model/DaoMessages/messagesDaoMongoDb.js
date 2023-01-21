import containerMongoDb from '../../containers/containerMongoDb.js';
import mongoose from 'mongoose'

class messagesDaoMongoDb extends containerMongoDb {
constructor(){
    let modelSchema = new mongoose.Schema({
        email: {
        type: String,
        required: true,
        },
        type: {
            type: String,
            required: true,
        },
        messages: {
            type: Array,
            required: true
        }},
        { timestamps: true })
    super('messages',modelSchema)
}

    async findByUser(user){
        try {
            const conversation = await this.collection.find({ email: user }).exec()
            return conversation
    }
    catch (error) {
        throw new Error("Error al buscar la orden")
    }
    }
}

export default messagesDaoMongoDb;

