import { InitDB } from "./utils/db.js";

// Cargar fichero env
process.loadEnvFile("./.env");

export const {
    PORT = 3000,
    INT = '127.0.0.1'
} = process.env;

// Iniciamos la DB
InitDB();