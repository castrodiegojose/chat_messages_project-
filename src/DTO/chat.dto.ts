import { 
    IChat, 
    ChatModel, 
    IRegularCustomer, 
    IVipCustomer, 
    ILocationMessage, 
    ITextMessage } from "../model/chat.model"
import { v4 as uuid } from "uuid";

class ClassChatDto {

    static instance: any;    
    constructor() {
        if(!!ClassChatDto.instance){
            return ClassChatDto.instance
        }
        ClassChatDto.instance = this;
    }


    async createChat(
        isFavourite = null, 
        customer: IRegularCustomer | IVipCustomer, 
        ):Promise<IChat>{

        const assignId:string = uuid();

        const chatCreated = await ChatModel.create({
            chatId: assignId,
            isFavourite,
            customer,
        })
        
        return await chatCreated.save();
    }

    async getChat(id: string=""){
        if(id) return await ChatModel.findOne({chatId: id})
        return await ChatModel.find({})
    }

    async checkChat(name: string, lastName: string){        
        return await ChatModel.find({
            "customer.firstName": name,
            "customer.lastName" : lastName
        });
    }

    async updateChat(
        isFavourite: boolean = false, 
        newCustomer: object | IRegularCustomer | IVipCustomer = {},
        id:string){
            return await ChatModel.updateOne({chatId: id}, {
                isFavourite: isFavourite,
                customer: newCustomer,
            })
        } 
    
    async deleteChat(id: string){
        return await ChatModel.deleteOne({chatId: id})
    }

    async updateMessages(id:string, newMessages: ILocationMessage | ITextMessage){
        const data = await ChatModel.updateOne({chatId: id}, {
            messages: newMessages,
        })
        return data
    }
}

export const ChatDtoInstance = new ClassChatDto();
