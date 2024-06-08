import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import {
  deleteUser,
  getUserProfile,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authenticate, getUserProfile);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
