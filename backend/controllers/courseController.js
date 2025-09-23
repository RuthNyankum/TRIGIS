import Course from "../models/course.js";

export const createCourse = async (req, res, next) => {
  const { title, description, price, content, thumbnail } = req.body;

  // Step 1: Validation
  if (!title || !description) {
    const error = new Error("Title and description are required");
    error.statusCode = 400;
    return next(error);
  }

  try {
    // Step 2: Create new course
    const course = await Course.create({
      title,
      description,
      price,
      content,
      thumbnail,
      createdBy: req.user._id, // course is linked to the logged-in user (admin)
    });

    // Step 3: Send success response
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};
