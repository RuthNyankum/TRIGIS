import express from "express";
import {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseStats,
} from "../controllers/adminCourseController.js";
import { routeProtect, authorizeRoles } from "../middlewares/routeProtect.js";

const router = express.Router();

// Apply authentication and admin authorization to all routes
router.use(routeProtect);
router.use(authorizeRoles("admin", "instructor"));

// Stats route
router.get("/stats", getCourseStats);

// CRUD routes
router.route("/").get(getAllCourses).post(createCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

export default router;
