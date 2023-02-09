import dotenv from "dotenv";

dotenv.config();

export const configLocal = {
    port: Number(process.env.PORT) || 3000,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
};
