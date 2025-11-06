// import Course from "../models/course.js";
// import Enrollment from "../models/enrollment.js";

// //  Example
// export const getEnrolledCourses = async (req, res) => {
//   try {
//     const enrollments = await Enrollment.find({
//       student: req.user._id,
//       status: "active",
//     })
//       .populate({
//         path: "course",
//         select:
//           "title instructor instructorName thumbnail rating duration totalLessons",
//       })
//       .sort({ lastAccessedAt: -1 });

//     const courses = enrollments.map((enrollment) => ({
//       id: enrollment.course._id,
//       title: enrollment.course.title,
//       instructor: enrollment.course.instructorName,
//       progress: enrollment.progress,
//       thumbnail: enrollment.course.thumbnail,
//       totalLessons: enrollment.course.totalLessons,
//       completedLessons: enrollment.completedLessons.length,
//       duration: enrollment.course.duration,
//       nextLesson: enrollment.currentLesson || "Start course",
//       rating: enrollment.course.rating,
//       studyTime: `${Math.floor(enrollment.studyTime / 60)} hours`,
//       enrollmentId: enrollment._id,
//     }));

//     res.status(200).json({ success: true, data: courses });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching enrolled courses",
//       error: error.message,
//     });
//   }
// };

// // @route   GET /api/student/courses/completed
// // @access  Private/Student
// export const getCompletedCourses = async (req, res) => {
//   try {
//     const enrollments = await Enrollment.find({
//       student: req.user._id,
//       status: "completed",
//     })
//       .populate({
//         path: "course",
//         select: "title instructor instructorName thumbnail rating",
//       })
//       .sort({ completedAt: -1 });

//     const courses = enrollments.map((enrollment) => ({
//       id: enrollment.course._id,
//       title: enrollment.course.title,
//       instructor: enrollment.course.instructorName,
//       completedDate: enrollment.completedAt.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       }),
//       thumbnail: enrollment.course.thumbnail,
//       rating: enrollment.course.rating,
//       certificateAvailable: enrollment.certificateIssued,
//       certificateUrl: enrollment.certificateUrl,
//       finalScore: enrollment.finalScore,
//       enrollmentId: enrollment._id,
//     }));

//     res.status(200).json({
//       success: true,
//       data: courses,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching completed courses",
//       error: error.message,
//     });
//   }
// };

// // @desc    Get course details for student
// // @route   GET /api/student/courses/:id
// // @access  Private/Student
// export const getCourseDetails = async (req, res) => {
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

//     // Check if student is enrolled
//     const enrollment = await Enrollment.findOne({
//       student: req.user._id,
//       course: req.params.id,
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         course,
//         enrollment: enrollment || null,
//         isEnrolled: !!enrollment,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error fetching course details",
//       error: error.message,
//     });
//   }
// };

// // @desc    Enroll in a course
// // @route   POST /api/student/courses/:id/enroll
// // @access  Private/Student
// export const enrollInCourse = async (req, res) => {
//   try {
//     const course = await Course.findById(req.params.id);

//     if (!course) {
//       return res.status(404).json({
//         success: false,
//         message: "Course not found",
//       });
//     }

//     if (course.status !== "published") {
//       return res.status(400).json({
//         success: false,
//         message: "This course is not available for enrollment",
//       });
//     }

//     // Check if already enrolled
//     const existingEnrollment = await Enrollment.findOne({
//       student: req.user._id,
//       course: req.params.id,
//     });

//     if (existingEnrollment) {
//       return res.status(400).json({
//         success: false,
//         message: "You are already enrolled in this course",
//       });
//     }

//     // Create enrollment
//     const enrollment = await Enrollment.create({
//       student: req.user._id,
//       course: req.params.id,
//     });

//     // Update course enrollment count
//     course.enrolledStudents += 1;
//     await course.save();

//     res.status(201).json({
//       success: true,
//       data: enrollment,
//       message: "Successfully enrolled in course",
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Error enrolling in course",
//       error: error.message,
//     });
//   }
// };

// // @desc    Update course progress
// // @route   PUT /api/student/courses/:id/progress
// // @access  Private/Student
// export const updateProgress = async (req, res) => {
//   try {
//     const { lessonId, studyTime } = req.body;

//     const enrollment = await Enrollment.findOne({
//       student: req.user._id,
//       course: req.params.id,
//     });

//     if (!enrollment) {
//       return res.status(404).json({
//         success: false,
//         message: "Enrollment not found",
//       });
//     }

//     // Mark lesson as completed if not already
//     const lessonCompleted = enrollment.completedLessons.find(
//       (lesson) => lesson.lessonId.toString() === lessonId
//     );

//     if (!lessonCompleted) {
//       enrollment.completedLessons.push({
//         lessonId,
//         completedAt: new Date(),
//       });
//     }

//     // Update study time
//     if (studyTime) {
//       enrollment.studyTime += studyTime;
//     }

//     // Calculate progress
//     const course = await Course.findById(req.params.id);
//     enrollment.progress = Math.round(
//       (enrollment.completedLessons.length / course.totalLessons) * 100
//     );

//     // Check if course is completed
//     if (enrollment.progress >= 100 && enrollment.status !== "completed") {
//       enrollment.status = "completed";
//       enrollment.completedAt = new Date();
//       enrollment.certificateIssued = true;
//       // Generate certificate URL here
//       enrollment.certificateUrl = `/certificates/${enrollment._id}`;
//     }

//     enrollment.lastAccessedAt = new Date();
//     await enrollment.save();

//     res.status(200).json({
//       success: true,
//       data: enrollment,
//       message: "Progress updated successfully",
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Error updating progress",
//       error: error.message,
//     });
//   }
// };

// // @desc    Rate a course
// // @route   POST /api/student/courses/:id/rate
// // @access  Private/Student
// export const rateCourse = async (req, res) => {
//   try {
//     const { rating, review } = req.body;

//     if (!rating || rating < 1 || rating > 5) {
//       return res.status(400).json({
//         success: false,
//         message: "Rating must be between 1 and 5",
//       });
//     }

//     const enrollment = await Enrollment.findOne({
//       student: req.user._id,
//       course: req.params.id,
//     });

//     if (!enrollment) {
//       return res.status(404).json({
//         success: false,
//         message: "You must be enrolled to rate this course",
//       });
//     }

//     // Update enrollment rating
//     enrollment.rating = rating;
//     enrollment.review = review;
//     await enrollment.save();

//     // Update course rating
//     const course = await Course.findById(req.params.id);
//     const totalRatings = course.totalRatings + 1;
//     const newRating =
//       (course.rating * course.totalRatings + rating) / totalRatings;

//     course.rating = Math.round(newRating * 10) / 10;
//     course.totalRatings = totalRatings;
//     await course.save();

//     res.status(200).json({
//       success: true,
//       message: "Rating submitted successfully",
//       data: { rating, review },
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: "Error submitting rating",
//       error: error.message,
//     });
//   }
// };

///////NEW COUSE CONTROLLER WITH MEDIA//////
// ============================================
// STUDENT COURSE CONTROLLER
// ============================================

export const getEnrolledCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
      status: "active",
    })
      .populate({
        path: "course",
        select:
          "title instructor instructorName thumbnail rating totalDuration totalLessons sections",
      })
      .sort({ lastAccessedAt: -1 });

    const courses = enrollments.map((enrollment) => ({
      id: enrollment.course._id,
      title: enrollment.course.title,
      instructor: enrollment.course.instructorName,
      progress: enrollment.progress,
      thumbnail: enrollment.course.thumbnail,
      totalLessons: enrollment.course.totalLessons,
      completedLessons: enrollment.completedLessons.length,
      duration: `${enrollment.course.totalDuration} min`,
      nextLesson: enrollment.currentLesson || "Start course",
      rating: enrollment.course.rating,
      studyTime: `${Math.floor(enrollment.studyTime / 60)} hours`,
      enrollmentId: enrollment._id,
    }));

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching enrolled courses",
      error: error.message,
    });
  }
};

export const getCompletedCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
      status: "completed",
    })
      .populate({
        path: "course",
        select: "title instructor instructorName thumbnail rating",
      })
      .sort({ completedAt: -1 });

    const courses = enrollments.map((enrollment) => ({
      id: enrollment.course._id,
      title: enrollment.course.title,
      instructor: enrollment.course.instructorName,
      completedDate: enrollment.completedAt.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      thumbnail: enrollment.course.thumbnail,
      rating: enrollment.course.rating,
      certificateAvailable: enrollment.certificateIssued,
      certificateUrl: enrollment.certificateUrl,
      finalScore: enrollment.finalScore,
      enrollmentId: enrollment._id,
    }));

    res.status(200).json({
      success: true,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching completed courses",
      error: error.message,
    });
  }
};

// @desc    Get course details for student (with curriculum)
// @route   GET /api/courses/student/:id
// @access  Private/Student
export const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email")
      .select("+sections"); // Include sections for enrolled students

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Check if student is enrolled
    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.id,
    });

    // If not enrolled, hide lesson content
    let courseData = course.toObject();
    if (!enrollment) {
      courseData.sections = courseData.sections?.map((section) => ({
        ...section,
        lessons: section.lessons.map((lesson) => ({
          title: lesson.title,
          description: lesson.description,
          duration: lesson.video?.duration || 0,
          isFree: lesson.isFree,
          type: lesson.type,
          order: lesson.order,
          // Hide video URLs and content for non-enrolled students
        })),
      }));
    }

    res.status(200).json({
      success: true,
      data: {
        course: courseData,
        enrollment: enrollment || null,
        isEnrolled: !!enrollment,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching course details",
      error: error.message,
    });
  }
};

// @desc    Get specific lesson (only for enrolled students)
// @route   GET /api/courses/student/:courseId/lessons/:lessonId
// @access  Private/Student
export const getLesson = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;

    // Check enrollment
    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (!enrollment) {
      return res.status(403).json({
        success: false,
        message: "You must be enrolled to access lessons",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Find the lesson
    let foundLesson = null;
    let sectionInfo = null;

    for (const section of course.sections) {
      const lesson = section.lessons.id(lessonId);
      if (lesson) {
        foundLesson = lesson;
        sectionInfo = {
          id: section._id,
          title: section.title,
        };
        break;
      }
    }

    if (!foundLesson) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
    }

    // Check if lesson is completed
    const isCompleted = enrollment.completedLessons.some(
      (cl) => cl.lessonId.toString() === lessonId
    );

    res.status(200).json({
      success: true,
      data: {
        lesson: foundLesson,
        section: sectionInfo,
        isCompleted,
        progress: enrollment.progress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching lesson",
      error: error.message,
    });
  }
};

export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    if (course.status !== "published") {
      return res.status(400).json({
        success: false,
        message: "This course is not available for enrollment",
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.id,
    });

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: "You are already enrolled in this course",
      });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: req.params.id,
    });

    course.enrolledStudents += 1;
    await course.save();

    res.status(201).json({
      success: true,
      data: enrollment,
      message: "Successfully enrolled in course",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error enrolling in course",
      error: error.message,
    });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { lessonId, studyTime } = req.body;

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.id,
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found",
      });
    }

    const lessonCompleted = enrollment.completedLessons.find(
      (lesson) => lesson.lessonId.toString() === lessonId
    );

    if (!lessonCompleted) {
      enrollment.completedLessons.push({
        lessonId,
        completedAt: new Date(),
      });
    }

    if (studyTime) {
      enrollment.studyTime += studyTime;
    }

    const course = await Course.findById(req.params.id);
    enrollment.progress = Math.round(
      (enrollment.completedLessons.length / course.totalLessons) * 100
    );

    if (enrollment.progress >= 100 && enrollment.status !== "completed") {
      enrollment.status = "completed";
      enrollment.completedAt = new Date();
      enrollment.certificateIssued = true;
      enrollment.certificateUrl = `/certificates/${enrollment._id}`;
    }

    enrollment.lastAccessedAt = new Date();
    await enrollment.save();

    res.status(200).json({
      success: true,
      data: enrollment,
      message: "Progress updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating progress",
      error: error.message,
    });
  }
};

export const rateCourse = async (req, res) => {
  try {
    const { rating, review } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const enrollment = await Enrollment.findOne({
      student: req.user._id,
      course: req.params.id,
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "You must be enrolled to rate this course",
      });
    }

    enrollment.rating = rating;
    enrollment.review = review;
    await enrollment.save();

    const course = await Course.findById(req.params.id);

    // Add review to course
    course.reviews.push({
      user: req.user._id,
      rating,
      comment: review,
    });

    // Recalculate rating
    await course.calculateRating();

    res.status(200).json({
      success: true,
      message: "Rating submitted successfully",
      data: { rating, review },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error submitting rating",
      error: error.message,
    });
  }
};
