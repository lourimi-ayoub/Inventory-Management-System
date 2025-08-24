import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import stockMovementRoutes from "./routes/stockMovements.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";



dotenv.config();


const app = express();
app.use(cors()); 
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected✅✅"))
  .catch(err => console.error(err));

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/stockMovements", stockMovementRoutes);


app.use("/auth", authRoutes);
// Test route
app.get("/api/hello", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => console.log("Server running on port 5000"));
