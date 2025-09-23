import { Router } from "express";
import { authorizeRoles, routeProtect } from "../middlewares/routeProtect.js";
import { createCourse } from "../controllers/courseController.js";

const router = Router();

router.post("/create", routeProtect, authorizeRoles("admin"), createCourse);

export default router;
