import { sql } from "../config/db.js";

const SAMPLE_SPOTS = [
    {
        street: "Via Zamboni 33",
        tot_available: 30,
    },
    {
        street: "Via Antonio 9/3a",
        tot_available: 15,
    },
    {
        street: "Via Altabella 59",
        tot_available: 39
    },
];

async function seedDatabase() {
    try {
        // First, clear existing data
        await sql.query(`TRUNCATE TABLE parkingspots RESTART IDENTITY`);

        // Insert all spots
        for (const spot of SAMPLE_SPOTS) {
            await sql.query(`
                INSERT INTO parkingspots (street, tot_available)
                VALUES ($1, $2)`,
            [spot.street, spot.tot_available]
        );
        }

        console.log("Database seeded successfully");
        process.exit(0); // Success code

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1); // Failed code
    }
}

seedDatabase();