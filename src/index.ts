import app from "./app";
import { configLocal } from "./config/default";
import _connect from "./db/connect";
 
const server = app.listen(configLocal.port, ()=>{
    console.log(`Server run on port: ${configLocal.port} 🚀`);
    _connect();
})

export default server;
