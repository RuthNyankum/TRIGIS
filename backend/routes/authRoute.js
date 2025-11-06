import { Router } from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  refreshAccessToken,
  getCurrentUser,
} from "../controllers/authController.js";
import { routeProtect } from "../middlewares/routeProtect.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetPasswordToken", resetPassword);
router.post("/refresh-token", refreshAccessToken);
router.get("/me", routeProtect, getCurrentUser);

export default router;
