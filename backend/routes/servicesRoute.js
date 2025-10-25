import express from "express";
import {
  createService,
  getAllServices,
  getService,
  updateService,
  deleteService,
} from "../controllers/servicesController.js";
import { routeProtect, authorizeRoles } from "../middlewares/routeProtect.js";

const router = express.Router();

// Public routes (no authentication required)
router.get("/all", getAllServices); // Get all services
router.get("/:id", getService); // Get single service

// Protected routes (Authentication + Role based)
router.post(
  "/create",
  routeProtect,
  authorizeRoles("admin", "superadmin", "provider"),
  createService
);

router.put(
  "/update/:id",
  routeProtect,
  authorizeRoles("admin", "superadmin", "provider"),
  updateService
);

router.delete(
  "/delete/:id",
  routeProtect,
  authorizeRoles("admin", "superadmin", "provider"),
  deleteService
);

export default router;
