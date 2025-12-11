import { sql } from "../config/db.js";
import { features } from "process";
import fs from "fs";

const geojsonData = "./backend/config/rastrelliere-per-biciclette.geojson";
const seeedingData = JSON.parse(fs.readFileSync(geojsonData, "utf8"));
/*
console.log(seeedingData.features[0]);

{
  type: 'Feature',
  geometry: { coordinates: [ 11.364909, 44.50855 ], type: 'Point' },
  properties: {
    geo_point_2d: { lon: 11.364909, lat: 44.50855 },
    id: 'IyMDM',
    nomevia: 'via Moro',
    civico: '30',
    numposti: 18
  }
}
*/

const SPOT_TO_INSERT = seeedingData.features.map(feature => {
    return {
        street: feature.properties.nomevia + " " + feature.properties.civico,
        tot_available: feature.properties.numposti,
        geom: JSON.stringify(feature.geometry)  
    };
});

/*
const SAMPLE_SPOTS = [
    {
        street: "Via Zamboni 33",
        tot_available: 30,
        geom: "POLYGON((11.3486 44.4965, 11.3490 44.4965, 11.3490 44.4960, 11.3486 44.4960, 11.3486 44.4965))"
    },
    {
        street: "Via Antonio 9/3a",
        tot_available: 15,
        geom: "POLYGON((11.3551 44.4932, 11.3555 44.4932, 11.3555 44.4928, 11.3551 44.4928, 11.3551 44.4932))"
    },
    {
        street: "Via Altabella 59",
        tot_available: 39,
        geom: "POLYGON((11.3450 44.4950, 11.3454 44.4950, 11.3454 44.4946, 11.3450 44.4946, 11.3450 44.4950))"
    },
];
*/

async function seedDatabase() {
    try {
        // First, clear existing data
        await sql.query(`TRUNCATE TABLE parkingArea RESTART IDENTITY`);

        // Insert all spots
        for (const spot of SPOT_TO_INSERT) {
            await sql.query(`
                INSERT INTO parkingArea (street, tot_available, geom)
                VALUES ($1, $2, ST_GeomFromGeoJSON($3))`,
            [spot.street, spot.tot_available, spot.geom]
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

/*
https://dev.to/tejesh/nodejs-read-json-file-using-require-vs-fs-module-4f94
*/