import "dotenv/config";

import {Pool} from "pg";

console.log("DB_USER: ", process.env.DB_USER);


const pool = new Pool({
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
});

export default pool;