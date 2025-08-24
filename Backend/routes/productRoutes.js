import express from "express";
import Product from "../models/Product.js";
import { verifyToken } from "../middleware/auth.js"; // import

const router = express.Router();

// Protect all routes with JWT
router.use(verifyToken);

// Create product
router.post("/", verifyToken, async (req, res) => {
  try {
    const product = new Product({ ...req.body, owner: req.user.id });
    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Get all products
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;
    const products = await Product.find({ owner: userId });
    res.json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
