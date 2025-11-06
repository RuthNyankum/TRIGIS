import express from "express";
import {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getCourseStats,
  addSection,
  updateSection,
  deleteSection,
  addLesson,
  updateLesson,
  deleteLesson,
  addCourseResource,
  uploadLessonFile,
} from "../controllers/adminCourseController.js";
import {
  getEnrolledCourses,
  getCompletedCourses,
  getCourseDetails,
  getLesson,
  enrollInCourse,
  updateProgress,
  rateCourse,
} from "../controllers/studentCourseController.js";
import {
  getPublicCourses,
  getPublicCourseById,
} from "../controllers/publicCourseController.js";
import { routeProtect, authorizeRoles } from "../middlewares/routeProtect.js";
// import { uploadVideo, uploadPdf } from "../middlewares/upload.js";
import { uploadVideo, uploadPdf } from "../middlewares/upload.js";

const router = express.Router();

// ========================================
// 🟢 PUBLIC ROUTES (No authentication)
// ========================================
router.get("/public", getPublicCourses);
router.get("/public/:id", getPublicCourseById);

// ========================================
// 🔵 ADMIN ROUTES
// ========================================

// Stats route (must come before /:id)
router.get(
  "/admin/stats",
  routeProtect,
  authorizeRoles("admin", "instructor", "superadmin"),
  getCourseStats
);

// Base course CRUD
router
  .route("/admin")
  .get(
    routeProtect,
    authorizeRoles("admin", "instructor", "superadmin"),
    getAllCourses
  )
  .post(
    routeProtect,
    authorizeRoles("admin", "instructor", "superadmin"),
    createCourse
  );

router
  .route("/admin/:id")
  .get(
    routeProtect,
    authorizeRoles("admin", "instructor", "superadmin"),
    getCourse
  )
  .put(
    routeProtect,
    authorizeRoles("admin", "instructor", "superadmin"),
    updateCourse
  )
  .delete(
    routeProtect,
    authorizeRoles("admin", "instructor", "superadmin"),
    deleteCourse
  );

// ====== SECTION MANAGEMENT ======
router.post(
  "/admin/:id/sections",
  routeProtect,
  authorizeRoles("admin", "instructor", "superadmin"),
  addSection
);

router
  .route("/admin/:id/sections/:sectionId")
  .put(
    routeProtect,
    authorizeRoles("admin", "instructor", "superadmin"),
    updateSection
  )
  .delete(
    routeProtect,
    authorizeRoles("admin", "instructor", "superadmin"),
    deleteSection
  );

// ====== LESSON MANAGEMENT ======
router.post(
  "/admin/:id/sections/:sectionId/lessons",
  routeProtect,
  authorizeRoles("admin", "instructor", "superadmin"),
  addLesson
);

router
  .route("/admin/:id/sections/:sectionId/lessons/:lessonId")
  .put(
    routeProtect,
    authorizeRoles("admin", "instructor", "superadmin"),
    updateLesson
  )
  .delete(
    routeProtect,
    authorizeRoles("admin", "instructor", "superadmin"),
    deleteLesson
  );

// ====== COURSE RESOURCES ======
router.post(
  "/admin/:id/resources",
  routeProtect,
  authorizeRoles("admin", "instructor", "superadmin"),
  addCourseResource
);

// ========================================
// 🟣 STUDENT ROUTES
// ========================================

// Enrolled courses
router.get(
  "/student/enrolled",
  routeProtect,
  authorizeRoles("student"),
  getEnrolledCourses
);

// Completed courses
router.get(
  "/student/completed",
  routeProtect,
  authorizeRoles("student"),
  getCompletedCourses
);

// Course details
router.get(
  "/student/:id",
  routeProtect,
  authorizeRoles("student"),
  getCourseDetails
);

// Get specific lesson (NEW)
router.get(
  "/student/:courseId/lessons/:lessonId",
  routeProtect,
  authorizeRoles("student"),
  getLesson
);

// Enroll in course
router.post(
  "/student/:id/enroll",
  routeProtect,
  authorizeRoles("student"),
  enrollInCourse
);

// Update progress
router.put(
  "/student/:id/progress",
  routeProtect,
  authorizeRoles("student"),
  updateProgress
);

// Rate course
router.post(
  "/student/:id/rate",
  routeProtect,
  authorizeRoles("student"),
  rateCourse
);

// ====== FILE UPLOADS (Video/PDF) ======
// ====== FILE UPLOADS (Video/PDF) ======
router.post(
  "/admin/upload/video",
  routeProtect,
  authorizeRoles("admin", "instructor", "superadmin"),
  uploadVideo.single("video"), // ← Field name must match
  uploadLessonFile
);

router.post(
  "/admin/upload/pdf",
  routeProtect,
  authorizeRoles("admin", "instructor", "superadmin"),
  uploadPdf.single("pdf"), // ← Field name must match
  uploadLessonFile
);

export default router;
