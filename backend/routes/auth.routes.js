import express from "express";
import { login, logout, refreshToken, Signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refreshtoken",refreshToken)
// Protected route example
router.get("/profile", protectRoute, (req, res) => {
  console.log("hit the profile");
  res.json({ message: "Profile data", user: req.user });
});

export default router;
