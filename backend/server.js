import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import parkingSpotRoutes from "./routes/parkingSpotRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Apply Arcjet rate limit to all route
app.use(async (req,res,next) => {
    try {
        const decision = await aj.protect(req, { requested:1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: "Too many requests" });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ error: "No bots allowed" });
            }
            return res.status(403).json({ error: "Forbidden" });
            
        } else if (decision.ip.isHosting()) {
            return res.status(403).json({ error: "Forbidden" });
            
        } else if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({ error: "Forbidden" });
            
        } 
        
        next();

    } catch (error) {
        console.log("Arcjet error", error);
        next(error);
    }
});

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