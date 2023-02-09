import { Router, Request, Response } from 'express';
import { 
    postChatHandler, 
    getChatHandler, 
    getChatHandlerById , 
    putChatHandlerById, 
    deleteChatHandler } from "../controllers/chat.controller";
import { 
    postMessagesHandler, 
    getMessagesHandler } from "../controllers/message.controller";

const router:Router = Router()

router.post('/chats', async(req: Request, res: Response)=>{    
    await postChatHandler(req, res)
})

router.get('/chats', async(req: Request, res: Response)=>{    
    await getChatHandler(req, res)
})

router.put('/chats/:chatId', async(req: Request, res: Response)=>{    
    await putChatHandlerById(req, res)
})

router.get('/chats/:chatId', async(req: Request, res: Response)=>{  
    await getChatHandlerById(req, res)
})


router.delete('/chats/:chatId', async(req: Request, res: Response)=>{    
    await deleteChatHandler(req, res)
})

router.post('/messages/:chatId', async(req: Request, res: Response)=>{    
    await postMessagesHandler(req, res)
})

router.get('/messages/:chatId', async(req: Request, res: Response)=>{
    await getMessagesHandler(req, res)
})


export default router