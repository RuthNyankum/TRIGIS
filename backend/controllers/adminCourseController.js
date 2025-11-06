// import Course from "../models/course.js";
// import Enrollment from "../models/enrollment.js";

// // @desc    Create new course
// // @route   POST /api/admin/courses
// // @access  Private/Admin
// export const createCourse = async (req, res) => {
//   try {
//     const user = req.user; // ✅ This comes from routeProtect middleware

//     // Prevent students from creating courses
//     if (!["admin", "instructor", "superadmin"].includes(user.role)) {
//       return res.status(403).json({
//         success: false,
//         message:
//           "Access denied: Only admins or instructors can create courses.",
//       });
//     }

//     // 🧠 Create the course automatically attaching instructor info
//     const course = await Course.create({
//       ...req.body,
//       instructor: user._id,
//       instructorName: user.fullName || user.name || "Unknown Instructor",
//     });

//     res.status(201).json({
//       success: true,
//       message: "✅ Course created successfully",
//       data: course,
//     });
//   } catch (error) {
//     console.error("Error creating course:", error);
//     res.status(400).json({
//       success: false,
//       message: "❌ Failed to create course",
//       error: error.message,
//     });
//   }
// };
// // @desc    Get all courses (Admin)
// // @route   GET /api/admin/courses
// // @access  Private/Admin
// export const getAllCourses = async (req, res) => {
//   try {
//     const { search, status, category, page = 1, limit = 10 } = req.query;

//     // Build query
//     let query = {};

//     if (search) {
//       query.$text = { $search: search };
//     }

//     if (status && status !== "all") {
//       query.status = status;
//     }

//     if (category && category !== "all") {
//       query.category = category;
//     }

//     // Execute query with pagination
//     const courses = await Course.find(query)
//       .populate("instructor", "name email")
//       .sort({ createdAt: -1 })
//       .limit(limit * 1)
//       .skip((page - 1) * limit);

//     const count = await Course.countDocuments(query);

//     res.status(200).json({
//       success: true,
//       data: courses,
//       totalPages: Math.ceil(count / limit),
//       currentPage: page,
//       total: count,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching courses",
//       error: error.message,
//     });
//   }
// };

// // @desc    Get single course (Admin)
// // @route   GET /api/admin/courses/:id
// // @access  Private/Admin
// export const getCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id).populate(
//       "instructor",
//       "name email"
//     );

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     // Get enrollment statistics
//     const enrollmentStats = await Enrollment.aggregate([
//       { $match: { course: course._id } },
//       {
//         $group: {
//           _id: null,
//           totalEnrollments: { $sum: 1 },
//           activeEnrollments: {
//             $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
//           },
//           completedEnrollments: {
//             $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
//           },
//           averageProgress: { $avg: "$progress" },
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       data: {
//         course,
//         stats: enrollmentStats[0] || {},
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching course",
//       error: error.message,
//     });
//   }
// };

// // @desc    Update course
// // @route   PUT /api/admin/courses/:id
// // @access  Private/Admin
// export const updateCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     const updatedCourse = await Course.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       {
//         new: true,
//         runValidators: true,
//       }
//     );

//     res.status(200).json({
//       success: true,
//       data: updatedCourse,
//       message: "Course updated successfully",
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Error updating course",
//       error: error.message,
//     });
//   }
// };

// // @desc    Delete course
// // @route   DELETE /api/admin/courses/:id
// // @access  Private/Admin
// export const deleteCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     // Check if course has active enrollments
//     const activeEnrollments = await Enrollment.countDocuments({
//       course: req.params.id,
//       status: "active",
//     });

//     if (activeEnrollments > 0) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Cannot delete course with active enrollments. Archive it instead.",
//       });
//     }

//     await course.deleteOne();

//     res.status(200).json({
//       success: true,
//       message: "Course deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error deleting course",
//       error: error.message,
//     });
//   }
// };

// // @desc    Get course statistics
// // @route   GET /api/admin/courses/stats
// // @access  Private/Admin
// export const getCourseStats = async (req, res) => {
//   try {
//     const stats = await Course.aggregate([
//       {
//         $group: {
//           _id: null,
//           totalCourses: { $sum: 1 },
//           publishedCourses: {
//             $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] },
//           },
//           draftCourses: {
//             $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
//           },
//           pendingCourses: {
//             $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
//           },
//           totalEnrollments: { $sum: "$enrolledStudents" },
//           averageRating: { $avg: "$rating" },
//         },
//       },
//     ]);

//     res.status(200).json({
//       success: true,
//       data: stats[0] || {},
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching statistics",
//       error: error.message,
//     });
//   }
// };

///////NEW COUSE CONTROLLER WITH MEDIA//////
// ============================================
// ADMIN COURSE CONTROLLER
// ============================================
import Course from "../models/course.js";
import Enrollment from "../models/enrollment.js";

// @desc    Create new course
// @route   POST /api/courses/admin
// @access  Private/Admin
export const createCourse = async (req, res) => {
  try {
    const user = req.user;

    if (!["admin", "instructor", "superadmin"].includes(user.role)) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied: Only admins or instructors can create courses.",
      });
    }

    const course = await Course.create({
      ...req.body,
      instructor: user._id,
      instructorName: user.fullName || user.name || "Unknown Instructor",
    });

    res.status(201).json({
      success: true,
      message: "✅ Course created successfully",
      data: course,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(400).json({
      success: false,
      message: "❌ Failed to create course",
      error: error.message,
    });
  }
};

// @desc    Get all courses (Admin)
// @route   GET /api/courses/admin
// @access  Private/Admin
export const getAllCourses = async (req, res) => {
  try {
    const { search, status, category, page = 1, limit = 10 } = req.query;

    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (status && status !== "all") {
      query.status = status;
    }

    if (category && category !== "all") {
      query.category = category;
    }

    const courses = await Course.find(query)
      .populate("instructor", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Course.countDocuments(query);

    res.status(200).json({
      success: true,
      data: courses,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

// @desc    Get single course (Admin)
// @route   GET /api/courses/admin/:id
// @access  Private/Admin
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const enrollmentStats = await Enrollment.aggregate([
      { $match: { course: course._id } },
      {
        $group: {
          _id: null,
          totalEnrollments: { $sum: 1 },
          activeEnrollments: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
          },
          completedEnrollments: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          averageProgress: { $avg: "$progress" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        course,
        stats: enrollmentStats[0] || {},
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message,
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/admin/:id
// @access  Private/Admin
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating course",
      error: error.message,
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/admin/:id
// @access  Private/Admin
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const activeEnrollments = await Enrollment.countDocuments({
      course: req.params.id,
      status: "active",
    });

    if (activeEnrollments > 0) {
      return res.status(400).json({
        success: false,
        message:
          "Cannot delete course with active enrollments. Archive it instead.",
      });
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message,
    });
  }
};

// @desc    Get course statistics
// @route   GET /api/courses/admin/stats
// @access  Private/Admin
export const getCourseStats = async (req, res) => {
  try {
    const stats = await Course.aggregate([
      {
        $group: {
          _id: null,
          totalCourses: { $sum: 1 },
          publishedCourses: {
            $sum: { $cond: [{ $eq: ["$status", "published"] }, 1, 0] },
          },
          draftCourses: {
            $sum: { $cond: [{ $eq: ["$status", "draft"] }, 1, 0] },
          },
          pendingCourses: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          totalEnrollments: { $sum: "$enrolledStudents" },
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: stats[0] || {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
      error: error.message,
    });
  }
};

// ====== NEW: SECTION MANAGEMENT ======

// @desc    Add section to course
// @route   POST /api/courses/admin/:id/sections
// @access  Private/Admin
export const addSection = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.addSection(req.body);

    res.status(201).json({
      success: true,
      message: "Section added successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding section",
      error: error.message,
    });
  }
};

// @desc    Update section
// @route   PUT /api/courses/admin/:id/sections/:sectionId
// @access  Private/Admin
export const updateSection = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const section = course.sections.id(req.params.sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    Object.assign(section, req.body);
    await course.save();

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating section",
      error: error.message,
    });
  }
};

// @desc    Delete section
// @route   DELETE /api/courses/admin/:id/sections/:sectionId
// @access  Private/Admin
// @desc    Delete section
// @route   DELETE /api/courses/admin/:id/sections/:sectionId
// @access  Private/Admin
export const deleteSection = async (req, res) => {
  try {
    console.log("🗑️ Deleting section:", {
      courseId: req.params.id,
      sectionId: req.params.sectionId,
    });

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const sectionToDelete = course.sections.id(req.params.sectionId);

    if (!sectionToDelete) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // Remove the section using pull
    course.sections.pull(req.params.sectionId);

    // Save the course
    await course.save();

    console.log("✅ Section deleted successfully");

    res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: course,
    });
  } catch (error) {
    console.error("❌ Error deleting section:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting section",
      error: error.message,
    });
  }
};
// ====== NEW: LESSON MANAGEMENT ======

// @desc    Add lesson to section
// @route   POST /api/courses/admin/:id/sections/:sectionId/lessons
// @access  Private/Admin
export const addLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await course.addLesson(req.params.sectionId, req.body);

    res.status(201).json({
      success: true,
      message: "Lesson added successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

// @desc    Update lesson
// @route   PUT /api/courses/admin/:id/sections/:sectionId/lessons/:lessonId
// @access  Private/Admin
export const updateLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const section = course.sections.id(req.params.sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    const lesson = section.lessons.id(req.params.lessonId);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    Object.assign(lesson, req.body);
    lesson.updatedAt = new Date();
    await course.save();

    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating lesson",
      error: error.message,
    });
  }
};

// @desc    Delete lesson
// @route   DELETE /api/courses/admin/:id/sections/:sectionId/lessons/:lessonId
// @access  Private/Admin
// @desc    Delete lesson
// @route   DELETE /api/courses/admin/:id/sections/:sectionId/lessons/:lessonId
// @access  Private/Admin
export const deleteLesson = async (req, res) => {
  try {
    console.log("🗑️ Deleting lesson:", {
      courseId: req.params.id,
      sectionId: req.params.sectionId,
      lessonId: req.params.lessonId,
    });

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const section = course.sections.id(req.params.sectionId);

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // FIX: Use pull instead of remove for subdocuments
    const lessonToDelete = section.lessons.id(req.params.lessonId);

    if (!lessonToDelete) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // Remove the lesson using pull
    section.lessons.pull(req.params.lessonId);

    // Save the course
    await course.save();

    console.log("✅ Lesson deleted successfully");

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
      data: course,
    });
  } catch (error) {
    console.error("❌ Error deleting lesson:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting lesson",
      error: error.message,
    });
  }
};

// @desc    Add resource to course
// @route   POST /api/courses/admin/:id/resources
// @access  Private/Admin
export const addCourseResource = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.courseResources.push(req.body);
    await course.save();

    res.status(201).json({
      success: true,
      message: "Resource added successfully",
      data: course,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding resource",
      error: error.message,
    });
  }
};

// @desc Upload lesson file (video or PDF)
// @route POST /api/courses/admin/upload/video or /api/courses/admin/upload/pdf
// @access Private (admin, instructor)
export const uploadLessonFile = async (req, res) => {
  try {
    console.log("📤 Upload request received");
    console.log("File:", req.file);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No file uploaded",
      });
    }

    // Determine type from the file mimetype or route
    const isVideo = req.file.mimetype.startsWith("video/");
    const isPdf = req.file.mimetype === "application/pdf";

    const fileType = isVideo ? "video" : isPdf ? "pdf" : "file";

    console.log("✅ File uploaded successfully:", req.file.path);

    res.status(200).json({
      success: true,
      url: req.file.path, // Cloudinary public URL
      type: fileType,
      message: `${fileType.toUpperCase()} uploaded successfully`,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    res.status(500).json({
      success: false,
      error: "File upload failed",
      message: error.message,
      details: error.stack,
    });
  }
};
