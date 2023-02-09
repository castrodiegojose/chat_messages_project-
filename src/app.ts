import express from "express"
import router from "./routes/routes";

const app = express();

//---------Body Codification-----//
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//---------Routes-----//
app.use('/api', router)

export default app;