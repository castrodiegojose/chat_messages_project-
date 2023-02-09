import mongoose, { ConnectOptions } from "mongoose";
import { configLocal } from "../config/default";

function _connect() {
    
    const dbUri = `mongodb://${configLocal.dbHost}/${configLocal.dbName}`;

    mongoose.set('strictQuery', false);
    mongoose.connect(dbUri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions)
        .then(() => {
            console.log("Database connected ☁");
        })
        .catch((error) => {
            console.log(error);
            console.log("db error", error);
        });
}

export default _connect;