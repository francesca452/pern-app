import express from "express";
import { getParkingSpots, getParkingSpot, createParkingSpot, updateParkingSpot, deleteParkingSpot } from "../controllers/parkingSpotController.js";

const router = express.Router();

router.get("/", getParkingSpots); 
router.get("/:id", getParkingSpot); 
router.post("/", createParkingSpot);
router.put("/:id", updateParkingSpot);
router.delete("/:id", deleteParkingSpot);

export default router;