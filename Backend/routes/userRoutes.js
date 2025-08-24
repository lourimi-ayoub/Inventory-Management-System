// 
import express from "express";
import { createUser, getUsers } from "../controllers/userController.js";

const router = express.Router();

// POST /users 
router.post("/", createUser);

// GET /users  
router.get("/login", getUsers);

export default router;
