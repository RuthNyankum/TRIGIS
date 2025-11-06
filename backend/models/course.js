import mongoose from "mongoose";

// Sub-schema for course resources (PDFs, files, links)
const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["pdf", "document", "link", "zip", "image", "other"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number, // in bytes
    default: 0,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

// Sub-schema for quiz questions (optional enhancement)
const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      text: String,
      isCorrect: Boolean,
    },
  ],
  explanation: String,
  points: {
    type: Number,
    default: 1,
  },
});

// Sub-schema for lessons
const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false, // ← Changed to false
    default: "", // ← Added default
  },
  order: {
    type: Number,
    required: true,
  },

  // Video content
  video: {
    url: {
      type: String,
      default: null,
    },
    duration: {
      type: Number, // in seconds
      default: 0,
    },
    thumbnail: {
      type: String,
      default: null,
    },
    provider: {
      type: String,
      enum: ["youtube", "vimeo", "cloudinary", "s3", "local", "other"],
      default: "local",
    },
    quality: {
      type: String,
      enum: ["720p", "1080p", "4k", "auto"],
      default: "auto",
    },
  },

  // Text content (for reading materials)
  content: {
    type: String, // Rich text/HTML content
    default: "",
  },

  // Lesson type
  type: {
    type: String,
    enum: ["video", "article", "quiz", "assignment", "live-session"],
    default: "video",
  },

  // Resources attached to this lesson
  resources: [resourceSchema],

  // Quiz for this lesson (optional)
  quiz: {
    questions: [quizQuestionSchema],
    passingScore: {
      type: Number,
      default: 70, // percentage
    },
    timeLimit: {
      type: Number, // in minutes
      default: 0, // 0 means no limit
    },
  },

  // Lesson settings
  isFree: {
    type: Boolean,
    default: false, // Preview lesson
  },
  isPublished: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Sub-schema for course sections/modules
const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
  },
  order: {
    type: Number,
    required: true,
  },
  lessons: [lessonSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Main Course Schema
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    shortDescription: {
      type: String,
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },

    // Instructor information
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    instructorName: {
      type: String,
      required: false,
    },
    instructorBio: {
      type: String,
      default: "",
    },
    instructorImage: {
      type: String,
      default: null,
    },

    // Course metadata
    category: {
      type: String,
      required: true,
      enum: [
        "Programming",
        "Design",
        "Marketing",
        "Business",
        "Data Science",
        "Other",
      ],
    },
    subcategory: {
      type: String,
      default: "",
    },
    tags: [String],
    language: {
      type: String,
      default: "English",
    },

    // Pricing
    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number, // For showing discounts
      default: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },

    // Course content structure
    sections: [sectionSchema],

    // Course statistics (auto-calculated)
    totalDuration: {
      type: Number, // in minutes
      default: 0,
    },
    totalLessons: {
      type: Number,
      default: 0,
    },
    totalSections: {
      type: Number,
      default: 0,
    },
    totalVideos: {
      type: Number,
      default: 0,
    },
    totalArticles: {
      type: Number,
      default: 0,
    },
    totalQuizzes: {
      type: Number,
      default: 0,
    },

    // Visual assets
    thumbnail: {
      type: String,
      default: null,
    },
    previewVideo: {
      url: String,
      duration: Number,
    },
    defaultCardColor: {
      type: String,
      enum: [
        "purple",
        "blue",
        "green",
        "red",
        "yellow",
        "indigo",
        "teal",
        "pink",
      ],
      default: "purple",
    },

    // Course materials
    courseResources: [resourceSchema], // General course resources

    // Course status and visibility
    status: {
      type: String,
      enum: ["draft", "pending", "published", "archived"],
      default: "draft",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },

    // Ratings and reviews
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: Number,
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Enrollment data
    enrolledStudents: {
      type: Number,
      default: 0,
    },
    maxEnrollments: {
      type: Number,
      default: null, // null means unlimited
    },

    // Course details
    requirements: [String],
    learningOutcomes: [String],
    targetAudience: [String],
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    // Course features
    features: {
      hasCertificate: {
        type: Boolean,
        default: true,
      },
      hasQuizzes: {
        type: Boolean,
        default: false,
      },
      hasAssignments: {
        type: Boolean,
        default: false,
      },
      hasDownloadableResources: {
        type: Boolean,
        default: false,
      },
      lifetimeAccess: {
        type: Boolean,
        default: true,
      },
      mobileAccess: {
        type: Boolean,
        default: true,
      },
    },

    // SEO
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],

    // Timestamps
    publishedAt: Date,
    lastUpdated: Date,
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
courseSchema.index({ title: "text", description: "text" });
courseSchema.index({ category: 1, status: 1 });
courseSchema.index({ instructor: 1 });
courseSchema.index({ price: 1 });
courseSchema.index({ rating: -1 });
courseSchema.index({ enrolledStudents: -1 });
courseSchema.index({ slug: 1 });

// Virtual for calculating discount percentage
courseSchema.virtual("discountPercentage").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return 0;
});

// Pre-save middleware to generate slug
courseSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

// Pre-save middleware to calculate totals
courseSchema.pre("save", function (next) {
  if (this.sections && this.sections.length > 0) {
    this.totalSections = this.sections.length;

    let totalLessons = 0;
    let totalDuration = 0;
    let totalVideos = 0;
    let totalArticles = 0;
    let totalQuizzes = 0;

    this.sections.forEach((section) => {
      if (section.lessons) {
        totalLessons += section.lessons.length;

        section.lessons.forEach((lesson) => {
          if (lesson.video && lesson.video.duration) {
            totalDuration += lesson.video.duration;
          }

          if (lesson.type === "video") totalVideos++;
          if (lesson.type === "article") totalArticles++;
          if (lesson.type === "quiz") totalQuizzes++;
        });
      }
    });

    this.totalLessons = totalLessons;
    this.totalDuration = Math.round(totalDuration / 60); // Convert to minutes
    this.totalVideos = totalVideos;
    this.totalArticles = totalArticles;
    this.totalQuizzes = totalQuizzes;

    // Update features
    this.features.hasQuizzes = totalQuizzes > 0;
    this.features.hasDownloadableResources = this.courseResources.length > 0;
  }

  next();
});

// Method to add a new section
courseSchema.methods.addSection = function (sectionData) {
  const order = this.sections.length + 1;
  this.sections.push({
    ...sectionData,
    order,
  });
  return this.save();
};

// Method to add a lesson to a section
courseSchema.methods.addLesson = function (sectionId, lessonData) {
  const section = this.sections.id(sectionId);
  if (!section) {
    throw new Error("Section not found");
  }

  const order = section.lessons.length + 1;
  section.lessons.push({
    ...lessonData,
    order,
  });

  return this.save();
};

// Method to calculate average rating
courseSchema.methods.calculateRating = function () {
  if (this.reviews && this.reviews.length > 0) {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = (sum / this.reviews.length).toFixed(1);
    this.totalRatings = this.reviews.length;
  }
  return this.save();
};

const Course = mongoose.model("Course", courseSchema);
export default Course;
