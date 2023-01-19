import ContainerMongoDb from '../../containers/ContainerMongoDb.js';

class MessagesDaoMongoDb extends ContainerMongoDb {
constructor(){
    super('messages',
    {
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
        }
    })}

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

export default MessagesDaoMongoDb;

