import Course from "../models/course.js";
import Enrollment from "../models/enrollment.js";

// @desc    Create new course
// @route   POST /api/admin/courses
// @access  Private/Admin
export const createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.user._id,
      instructorName: req.user.name,
    };

    const course = await Course.create(courseData);

    res.status(201).json({
      success: true,
      data: course,
      message: "Course created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating course",
      error: error.message,
    });
  }
};

// @desc    Get all courses (Admin)
// @route   GET /api/admin/courses
// @access  Private/Admin
export const getAllCourses = async (req, res) => {
  try {
    const { search, status, category, page = 1, limit = 10 } = req.query;

    // Build query
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

    // Execute query with pagination
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
// @route   GET /api/admin/courses/:id
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

    // Get enrollment statistics
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
// @route   PUT /api/admin/courses/:id
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
// @route   DELETE /api/admin/courses/:id
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

    // Check if course has active enrollments
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
// @route   GET /api/admin/courses/stats
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
