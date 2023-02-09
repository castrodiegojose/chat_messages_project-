import { Request, Response } from 'express';
import { ChatServiceInstance } from "../services/chat.service";
import { 
    TextMessageModel, 
    LocationMessageModel, 
    ITextMessage, 
    ILocationMessage } from "../model/chat.model";

export async function postMessagesHandler( req:Request, res:Response ){
    try{        
        const { text, latitude, longitude } = req.body;
        const { chatId } = req.params;      
        let message;
        const timeStamp = Date.now();

        if(text){
            message = (new TextMessageModel({
                timeStamp:timeStamp,
                isRecieved: true,
                text,
            })) as unknown as ITextMessage
        }else if(latitude && longitude){
            message = (new LocationMessageModel({
                timeStamp: timeStamp,
                isRecieved: true, 
                latitude,
                longitude,
            })) as unknown as ILocationMessage
        } else {
            return res.status(400).send({ 
                status: "error", 
                code: 400, 
                Message: "Text or Location is requiered" 
            });
        }
        
        const data = await ChatServiceInstance.createMessageService( <string>chatId, message )

        return res.status(200).send({ 
            status: "success", 
            code: 200, 
            Message: "Message sent", data 
        });

    } catch (error) {
        if (error) {
            return res.status(404).send({ 
                status: "error", 
                code: 404, 
                Message: "Create message error" 
            });
        }
        return res.status(500).send({ 
            status: "error", 
            code: 500, 
            Message: "Unable to create Message" 
        }); 
    }
}

export async function getMessagesHandler( req:Request, res:Response) {
    try{
        const { chatId } = req.params;
        const data = await ChatServiceInstance.getMessagesByChatId(chatId);

        return res.status(200).send({ 
            status: "success", 
            code: 200, 
            codeMessageLanguage: "storageSuccess", 
            data 
        });

    } catch (error) 
    {
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
