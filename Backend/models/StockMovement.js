import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  type: { type: String, enum: ["in", "out", "adjustment"], required: true },
  stock: { type: Number, required: true },
  reason: { type: String, required: true },
  date: { type: Date, default: Date.now }
  ,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("StockMovement", stockMovementSchema);

