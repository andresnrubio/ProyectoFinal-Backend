import ContainerMongoDb from '../../containers/ContainerMongoDb.js';

class OrdersDaoMongoDb extends ContainerMongoDb {
constructor(){
    super('orders',
    {
        buyer: {
        type: String,
        required: true,
        },
        status: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true
        },
        orderNumber: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    })}

    async newOrder(){
        const orders = await this.getAllFile()
        return { orderNumber: orders.length + 1, status: 'generada' }
    }

    async findByBuyer(buyer){
        try {
            const orders = await this.collection.find({ buyer: buyer }).exec()
        return orders
    }
    catch (error) {
        throw new Error("Error al buscar la orden")
    }
    }
}

export default OrdersDaoMongoDb;

