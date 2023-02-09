import { ChatDtoInstance } from "../DTO/chat.dto";
import { BaseException } from "../exceptions/baseExceptions";
import { 
    ILocationMessage, 
    IRegularCustomer, 
    IVipCustomer, 
    ITextMessage, 
    IChat } from "../model/chat.model";

class ClassChatService {
    
    static instance:any;
    constructor(){
        if(!!ClassChatService.instance){
            return ClassChatService.instance
        }
        ClassChatService.instance = this;
    }

    async createChatService(customer: IRegularCustomer | IVipCustomer){
        
        const checkIfChatExists = await ChatDtoInstance.checkChat(customer.firstName, customer.lastName);
        if(checkIfChatExists.length > 0){
            throw new BaseException("This User already has a chat");
        }
        return (await ChatDtoInstance.createChat(null, customer)) as IChat;
    }

    async getAllChats(){        
        const chats = await ChatDtoInstance.getChat()
        return chats;
    }

    async updateChatService(
        isFavourite:boolean=false, 
        newCustomer: object | IRegularCustomer | IVipCustomer = {}, 
        id:string=""){

        const checkIfChatExist = await ChatDtoInstance.getChat(<string>id)

        if(!checkIfChatExist){
            throw new BaseException(
                `Chat id:${id} not found`,
                null,
                500,
                "Error",
            );
        }
          
        if(!await ChatDtoInstance.updateChat(isFavourite, newCustomer, id )){
            throw new BaseException(
                `Error updating chat`,
                null,
                400,
                "Error",
            );
        }
        
        return newCustomer;        
    }

    async getChatById(id:string){ 
        const checkIfChatExist = await ChatDtoInstance.getChat(<string>id)
        if(!checkIfChatExist){
            throw new BaseException(
                `File id:${id} not found`,
                null,
                500,
                "Error",
            );
        }     

        return ChatDtoInstance.getChat(id)
    }

    async deleteChatById(id:string){
        const checkIfChatExist = await ChatDtoInstance.getChat(<string>id)

        if(!checkIfChatExist){
            throw new BaseException(
                `File id:${id} not found`,
                null,
                500,
                "Error",
            );
        }

        return await ChatDtoInstance.deleteChat(id)
    }

    async createMessageService( chatId:string, message: ITextMessage | ILocationMessage){    
        
        const checkIfChatExist = (await ChatServiceInstance.getChatById(<string>chatId)) as IChat

        if(!checkIfChatExist){
            throw new BaseException(
                `Chat id:${chatId} not found`,
                null,
                500,
                "Error",
            );
        }
        const arrayMessages: ITextMessage | ILocationMessage = checkIfChatExist.messages
        if(Array.isArray(arrayMessages)){
            arrayMessages.push(message)
        }

        if(!await ChatDtoInstance.updateMessages( checkIfChatExist.chatId, arrayMessages )){
            throw new BaseException(
                `Error creating chat message`,
                null,
                400,
                "Error",
            );
        }
        return message;
    }

    async getMessagesByChatId(chatId:string){
        const chat = (await ChatDtoInstance.getChat(chatId)) as IChat
        if(!chat){
            throw new BaseException(
                `Chat id:${chatId} not found`,
                null,
                500,
                "Error",
            );
        }
        const messages = chat.messages
        return messages
    }
}
export const ChatServiceInstance = new ClassChatService();
