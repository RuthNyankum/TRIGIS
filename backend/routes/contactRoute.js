import express from "express";
import {
  submitContactForm,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats,
} from "../controllers/contactController.js";
import { routeProtect, authorizeRoles } from "../middlewares/routeProtect.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Public routes
router.post("/", rateLimiter, submitContactForm);

// Admin routes (protected) - using your existing auth middleware
router.get(
  "/",
  routeProtect,
  authorizeRoles("admin", "superadmin"),
  getAllContacts
);
router.get(
  "/stats",
  routeProtect,
  authorizeRoles("admin", "superadmin"),
  getContactStats
);
router.get(
  "/:id",
  routeProtect,
  authorizeRoles("admin", "superadmin"),
  getContactById
);
router.patch(
  "/:id",
  routeProtect,
  authorizeRoles("admin", "superadmin"),
  updateContactStatus
);
router.delete(
  "/:id",
  routeProtect,
  authorizeRoles("admin", "superadmin"),
  deleteContact
);

export default router;
