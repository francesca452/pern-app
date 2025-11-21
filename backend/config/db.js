import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGUSER, PGPORT, PGPASSWORD, PGDATABASE } = process.env;

const con = new Client({
    host: PGHOST || "localhost",
    user: PGUSER || "postgres",
    port: PGPORT || 5432,
    password: PGPASSWORD,
    database: PGDATABASE || "dbs"
});

con.connect()
.then(() => console.log("Connected to database"))
.catch(err => console.error("Connection error: ", err));

export const sql = con;