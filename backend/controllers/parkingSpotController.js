import { sql } from "../config/db.js";

export const getParkingSpots = async (req, res) => {
    try {
        const spots = await sql.query(`
            SELECT * FROM parkingspots
            ORDER BY created_at DESC
        `);
        
        console.log(`Found ${spots.rows.length} parking spots`);
        res.status(200).json({
            success: true,
            data: spots.rows
        });

    } catch (error) {
        console.log("Error in getParkingSpots function", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch parking spots",
            details: error.message
        }); 
    };
};

export const getParkingSpot = async (req, res) => {
    const { id } = req.params;

    try {
        const spot = await sql.query(`
            SELECT * FROM parkingspots WHERE id=$1`,
            [id]
        );

        // Check if the spot exists
        if (spot.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Parking spot not found"
            });
        }
        
        console.log("Fetched spot");
        res.status(200).json({
            success: true,
            data: spot.rows[0]
        });

    } catch (error) {
        console.log("Error in getParkingSpot function");
        res.status(500).json({
            success: false,
            message: "Internal server error",
            details: error.message
        });
    };
}; 

export const createParkingSpot = async (req, res) => {
    const { street, tot_available } = req.body;

    // Validation 
    if (!street || !tot_available) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    // Validate tot_available is a number
    const totalAvailable = parseInt(tot_available);
    if (isNaN(totalAvailable) || totalAvailable < 0) {
        return res.status(400).json({
            success: false,
            message: "Total available parking spots must be a positive number"
        });
    }

    try {
        const newSpot = await sql.query(`
            INSERT INTO parkingspots (street, tot_available)
            VALUES ($1, $2)
            RETURNING *`,
            [street, totalAvailable]
        );

        console.log("New spot created");
        res.status(201).json({
            success: true,
            data: newSpot.rows[0]
        });

    } catch (error) {
        console.log("Error in createParkingSpot function");
        res.status(500).json({
            success: false,
            message: "Failed to create parking spot",
            details: error.message
        }); 
    };
};

export const updateParkingSpot = async (req, res) => {
    const { id } = req.params;
    const { street, tot_available } = req.body;
    
    try {
        const updatedSpot = await sql.query(`
            UPDATE parkingspots
            SET street=$1, tot_available=$2
            WHERE id=$3
            RETURNING *`,
            [street, tot_available, id]
        );

        if (updatedSpot.length === 0) { 
            return res.status(404).json({
                success: false,
                message: "Spot not found"
            });
        }
        
        console.log("Succesfully updated");
        res.status(200).json({
            success: true,
            data: updatedSpot.rows[0]
        });

    } catch (error) {
        console.log("Error in updateParkingSpot function");
        res.status(500).json({
            success: false,
            message: "Internal server error",
            details: error.message
        });
    };
}; 

export const deleteParkingSpot = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedSpot = await sql.query(`
            DELETE FROM parkingspots WHERE id=$1
            RETURNING *`,
            [id]
        );

        if(deletedSpot.length === 0) {
            return res.status(404).json({
                succes: false,
                message: "Spot not found"
            });
        }

        console.log("Parking spot removed");
        res.status(200).json({ 
            success: true,
            message: deletedSpot.rows[0]
        });

    } catch (error) {
        console.log("Error in deleteParkingSpot function");
        res.status(500).json({
            success: false,
            message: "Internal server error",
            details: error.message
        });
    };
};