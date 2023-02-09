import mongoose, { Schema } from "mongoose";

//---------Interfaces-----//

export interface IRegularCustomer {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}

export interface IVipCustomer {
    firstName: string;
    lastName: string;
    creditCard: string;
}

export interface ITextMessage {
    timeStamp: Date;
    isRecieved: boolean;
    text: string;
}

export interface ILocationMessage {
    timeStamp: Date;
    isRecieved: boolean;
    longitude: string;
    latitude: string;
}

export interface IChat extends Document {
    chatId: string;
    isFavourite: boolean;
    customer: IVipCustomer | IRegularCustomer ;
    messages: ILocationMessage | ITextMessage ;

}

//---------Schemas-----//

const MessageSchema = new Schema({
    timeStamp: {type: Date},
    isRecieved: {type: Boolean}
})
const MessageModel = mongoose.model('message', MessageSchema);

export const TextMessageModel = MessageModel.discriminator(
    'TextMessage', 
    new Schema({text: {type: String}}
    )
);
export const LocationMessageModel = MessageModel.discriminator(
    'LocationMessage', 
    new Schema({
        longitude: {type: String}, 
        latitude: {type: String}
    })
);

const CustomerSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String}
});
const CustomerModel = mongoose.model('customer', CustomerSchema);

export const RegularCustomerModel = CustomerModel.discriminator(
    'RegularCustomer', 
    new Schema({
        phoneNumber: {type: String}
    })
);
export const VIPCustomerModel = CustomerModel.discriminator(
    'VIPCustomer', 
    new Schema({
        creditCard: {type: String}
    })
);

const ChatSchema = new Schema({
    chatId: {type: String},
    isFavourite: {type: Boolean, default: false},
    customer: {type: CustomerSchema},
    messages: {type: [MessageSchema], default: []}
})
export const ChatModel = mongoose.model<IChat>('Chat', ChatSchema);
