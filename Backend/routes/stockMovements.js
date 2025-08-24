import express from "express";
import StockMovement from "../models/StockMovement.js"; 
import { verifyToken } from "../middleware/auth.js"; 
const router = express.Router();

// Get all stock movements

router.get("/", verifyToken, async (req, res) => {
  try {
    const movements = await StockMovement.find({ owner: req.user.id }).sort({ date: -1 });
    res.json(movements);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch movements" });
  }
});

// Add a new stock movement
router.post("/", verifyToken, async (req, res) => {
  try {
    const movement = new StockMovement({ ...req.body, owner: req.user.id });
    await movement.save();
    res.status(201).json(movement);
  } catch (err) {
    res.status(500).json({ error: "Failed to save movement" });
  }
});


export default router;