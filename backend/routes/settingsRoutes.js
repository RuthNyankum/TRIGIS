// routes/settingsRoutes.js
import express from "express";
import {
  getUserSettings,
  updateUserSettings,
  changePassword,
} from "../controllers/userSettingsController.js";
import { routeProtect } from "../middlewares/routeProtect.js";

const router = express.Router();

// All routes are protected
router.use(routeProtect);

router.route("/").get(getUserSettings).put(updateUserSettings);

router.put("/change-password", changePassword);

export default router;
