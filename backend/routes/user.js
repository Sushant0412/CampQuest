import express from "express";
import { register, login } from "../controllers/users.js";
import { authMiddleware } from "../utils/jwt.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Protected route example
router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
