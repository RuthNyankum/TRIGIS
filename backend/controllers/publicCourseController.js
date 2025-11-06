import Course from "../models/course.js";

export const getPublicCourses = async (req, res) => {
  try {
    console.log("📋 getPublicCourses called");
    console.log("Query params:", req.query);

    const {
      search,
      category,
      level,
      priceRange,
      sortBy = "newest",
      page = 1,
      limit = 20,
    } = req.query;

    // SIMPLIFIED: Only check status
    let query = { status: "published" };

    console.log("Initial query:", query);

    if (search) {
      query.$text = { $search: search };
    }

    if (category && category !== "all") {
      query.category = category;
    }

    if (level && level !== "all") {
      query.level = level;
    }

    if (priceRange && priceRange !== "all") {
      switch (priceRange) {
        case "free":
          query.price = 0;
          break;
        case "paid-low":
          query.price = { $gt: 0, $lte: 50 };
          break;
        case "paid-mid":
          query.price = { $gt: 50, $lte: 100 };
          break;
        case "paid-high":
          query.price = { $gt: 100 };
          break;
      }
    }

    console.log("Final query:", query);

    let sortOptions = {};
    switch (sortBy) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "popular":
        sortOptions = { enrolledStudents: -1 };
        break;
      case "rating":
        sortOptions = { rating: -1 };
        break;
      case "price-low":
        sortOptions = { price: 1 };
        break;
      case "price-high":
        sortOptions = { price: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const courses = await Course.find(query)
      .select(
        "title description category level price thumbnail defaultCardColor rating totalRatings enrolledStudents totalLessons totalDuration learningOutcomes instructorName createdAt features"
      )
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    console.log("✅ Courses found:", courses.length);
    if (courses.length > 0) {
      console.log("First course:", courses[0].title);
    }

    const count = await Course.countDocuments(query);

    const coursesWithExtras = courses.map((course) => ({
      ...course.toObject(),
      isBestseller: course.rating >= 4.7 && course.enrolledStudents >= 1000,
      isNew: new Date() - new Date(course.createdAt) < 30 * 24 * 60 * 60 * 1000,
      duration: `${course.totalDuration} min`,
    }));

    console.log(
      "📤 Sending response with",
      coursesWithExtras.length,
      "courses"
    );

    res.status(200).json({
      success: true,
      data: coursesWithExtras,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      total: count,
    });
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};

export const getPublicCourseById = async (req, res) => {
  try {
    console.log("📖 getPublicCourseById called for ID:", req.params.id);

    const course = await Course.findById(req.params.id).select(
      "title description category level price thumbnail defaultCardColor rating totalRatings enrolledStudents totalLessons totalDuration totalVideos totalArticles learningOutcomes requirements instructorName instructorBio language features sections reviews createdAt status isPublished"
    );

    console.log("Course found:", course ? "Yes" : "No");
    if (course) {
      console.log(
        "Course status:",
        course.status,
        "Published:",
        course.isPublished
      );
    }

    if (!course || course.status !== "published") {
      return res.status(404).json({
        success: false,
        message: "Course not found or not published",
      });
    }

    // Show section/lesson structure with limited info
    const courseData = course.toObject();
    if (courseData.sections) {
      courseData.sections = courseData.sections.map((section) => ({
        _id: section._id,
        title: section.title,
        description: section.description,
        order: section.order,
        lessons: section.lessons.map((lesson) => ({
          _id: lesson._id,
          title: lesson.title,
          description: lesson.description,
          type: lesson.type,
          video: lesson.video
            ? {
                duration: lesson.video.duration,
              }
            : null,
          content: lesson.content
            ? lesson.content.includes(".pdf")
              ? "PDF Available"
              : null
            : null,
          isFree: lesson.isFree,
          order: lesson.order,
        })),
      }));
    }

    res.status(200).json({
      success: true,
      data: courseData,
    });
  } catch (error) {
    console.error("❌ Error fetching course by ID:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message,
    });
  }
};
