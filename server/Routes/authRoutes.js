import { Router } from "express";
import { login, signup, forgotPassword, resetPassword } from "../Controllers/authController.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
