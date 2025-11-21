import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import parkingSpotRoutes from "./routes/parkingSpotRoutes.js";
import { sql } from "./config/db.js";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/parkingSpots", parkingSpotRoutes);

async function initDB() {
    try {
        await sql.query(`
            CREATE TABLE IF NOT EXISTS parkingspots (
                id SERIAL PRIMARY KEY,
                street VARCHAR(255) NOT NULL,
                tot_available INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error initDB:", error);
        process.exit(1);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
});