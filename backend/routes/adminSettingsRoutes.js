// routes/adminSettingsRoutes.js
import express from "express";
import {
  getPlatformSettings,
  updatePlatformSettings,
} from "../controllers/adminSettingsController.js";
import { routeProtect, authorizeRoles } from "../middlewares/routeProtect.js";

const router = express.Router();

// All routes are protected and require admin role
router.use(routeProtect);
router.use(authorizeRoles("admin", "superadmin"));

router.route("/").get(getPlatformSettings).put(updatePlatformSettings);

export default router;
