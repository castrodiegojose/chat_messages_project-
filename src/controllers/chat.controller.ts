import { Request, Response } from 'express';
import { IRegularCustomer, IVipCustomer, RegularCustomerModel, VIPCustomerModel } from '../model/chat.model';
import { BaseException } from "../exceptions/baseExceptions";
import { ChatServiceInstance } from "../services/chat.service";

export async function postChatHandler( req:Request, res:Response ){
    try{
        const { firstName, lastName, creditCard, phoneNumber } = req.body;

        if(!firstName || !lastName){
            throw new BaseException('firstName and lastName are required');
        }

        let customer;
        if(creditCard){
            customer = (new VIPCustomerModel({
                firstName,
                lastName,
                creditCard,
            })) as unknown as IVipCustomer
        }else if(phoneNumber){
            customer = (new RegularCustomerModel({
                firstName,
                lastName, 
                phoneNumber
            })) as unknown as IRegularCustomer
        }else{
            return res.status(400).send({ 
                status: "error", 
                code: 400, 
                Message: "Phone Number or Credit Card is required" 
            });
        }          
        const data = await ChatServiceInstance.createChatService( customer );
        return res.status(200).send({ status: "success", code: 200, Message: "Chat created", data });

    } catch (error) {
        if (error) {
            return res.status(404).send({ 
                status: "error", 
                code: 404, 
                Message: "Create chat error" 
            });
        }
        return res.status(500).send({ 
            status: "error", 
            code: 500, 
            Message: "Unable to create Chat" 
        }); 
    }
}

export async function getChatHandler( _req:Request, res: Response ) {
    try{
    const data = await ChatServiceInstance.getAllChats();
    
    return res.status(200).send({ 
        status: "success", 
        code: 200, Message: 
        "Chats found", data 
    });

    } catch (error) {
        if (error) {
            return res.status(404).send({ 
                status: "error", 
                code: 404, 
                Message: "Get chats error" 
            });
        }
        return res.status(500).send({ 
            status: "error", 
            code: 500, 
            Message: "Unable to get all Chats" 
        }); 
    }
}

export async function getChatHandlerById( req:Request, res: Response ) {
    try{
    const { chatId } = req.params;
    const data = await ChatServiceInstance.getChatById(<string>chatId)

    return res.status(200).send({ 
        status: "success", 
        code: 200, 
        Message: "Chat found", data 
    });

    } catch (error) {
        if (error) {
            return res.status(404).send({ 
                status: "error", 
                code: 404, 
                Message: "Get chat error" 
            });
        }
        return res.status(500).send({ 
            status: "error", 
            code: 500, 
            Message: "Unable to find chat" 
        }); 
    }
}

export async function putChatHandlerById( req:Request, res:Response ){
    try{
        const  { chatId }  = req.params;
        const { isFavourite = false, firstName, lastName, creditCard, phoneNumber } = req.body;

        if(!firstName || !lastName){
            throw new BaseException('firstName and lastName are required');
        }

        let newCustomer;
        if(creditCard){
            newCustomer = (new VIPCustomerModel({
                firstName,
                lastName,
                creditCard,
            })) as unknown as IVipCustomer
        }else if(phoneNumber){
            newCustomer = (new RegularCustomerModel({
                firstName,
                lastName, 
                phoneNumber
            })) as unknown as IRegularCustomer
        }else{
            return res.status(400).send({ 
                status: "error", 
                code: 400, 
                Message: "Phone Number or Credit Card is required" 
            });
        } 

        const data = await ChatServiceInstance.updateChatService( isFavourite, newCustomer, <string>chatId )

        return res.status(200).send({ 
            status: "success", 
            code: 200, 
            Message: "Chat update", data 
        });
            
    } catch (error) {
        if (error) {
            return res.status(404).send({ 
                status: "error", 
                code: 404, 
                Message: "Update chat error" 
            });
        }
        return res.status(500).send({ 
            status: "error", 
            code: 500, 
            Message: "Unable to update Chat" 
        }); 
    }
}

export async function deleteChatHandler( req:Request, res:Response ){
    try{
        const { chatId } = req.params;
        const data = await ChatServiceInstance.deleteChatById(<string>chatId)

        return res.status(200).send({ 
            status: "success", 
            code: 200, 
            Message: "Chat deleted successfully", 
            data
        });
    } 
    catch (error) {
        if (error) {
            return res.status(404).send({ 
                status: "error", 
                code: 404, 
                Message: "Delete chat error" 
            });
        }
        return res.status(500).send({ 
            status: "error", 
            code: 500, 
            Message: "Unable to delete Chat" 
        }); 
    }   
}

