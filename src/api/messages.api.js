const { messagesDao: messagesContainer } = await import('../model/index.js')
import {defineType} from '../utils/utils.js'
class messagesApiContainer {

    getAllFile = async () => {
        try {
            let messages = await messagesContainer.getAllFile();
            return messages
        } catch (error) {
            throw new Error("Error al obtener mensajes")
        }
    }
    
    saveMessage = async (message) => {
        try{
            const conversation = await messagesContainer.findByUser(message.author.email)

            if(conversation.length === 0){
            const newConversation = {email: message.author.email, type: defineType(message.author.email), messages: [message]}
            const newMessage = await messagesContainer.saveInFile(newConversation)
            return newMessage;
            }else{
                conversation[0].messages.push(message)
                const mensajesNuevos = conversation[0].messages
                const newMessage = await messagesContainer.updateById(conversation[0]._id, {messages: mensajesNuevos})
                return newMessage;
            }
        } catch (error) {
          throw new Error("Error al guardar archivo");
        }
    }
    
}

export default messagesApiContainer