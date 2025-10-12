// import mongoose, { model, Schema } from "mongoose";

// const courseSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     content: [
//       {
//         title: String,
//         videoUrl: String, // Cloudinary/YouTube embed link
//         pdfUrl: String, // optional
//       },
//     ],
//     thumbnail: {
//       type: String,
//       default: "",
//     },
//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     students: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Course = model("Course", courseSchema);
// export default Course;

import mongoose, { model, Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String, // e.g., "From beginner to professional writer"
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
        "Beginner to Advanced",
        "All Levels",
      ],
      default: "All Levels",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    originalPrice: {
      type: Number, // For showing discounts (e.g., GH₵600)
    },
    discount: {
      type: Number, // Percentage discount (e.g., 25)
      default: 0,
    },
    duration: {
      hours: {
        type: Number,
        required: true,
      },
      minutes: {
        type: Number,
        default: 0,
      },
    },
    lessonsCount: {
      type: Number,
      required: true,
      default: 0,
    },
    thumbnail: {
      type: String,
      default: "", // Empty string means no custom image uploaded
    },
    thumbnailPublicId: {
      type: String, // For Cloudinary deletion
    },
    // Default styling when no thumbnail is uploaded
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
      default: "purple", // Matches the purple gradient in your image
    },
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    instructor: {
      name: {
        type: String,
        required: true,
      },
      title: {
        type: String, // e.g., "Senior Content Strategist"
      },
      avatar: {
        type: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    highlights: [
      {
        type: String, // Key learning points (e.g., "Writing fundamentals and techniques")
      },
    ],
    content: [
      {
        title: String,
        videoUrl: String, // Cloudinary/YouTube embed link
        pdfUrl: String, // optional
        duration: Number, // duration in minutes
        order: Number, // lesson order
      },
    ],
    category: {
      type: String,
      enum: [
        "Writing",
        "Business",
        "Marketing",
        "Design",
        "Development",
        "Other",
      ],
      default: "Other",
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    enrollmentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Virtual for calculating discount percentage
courseSchema.virtual("discountPercentage").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return this.discount;
});

// Virtual for total duration string
courseSchema.virtual("durationString").get(function () {
  if (this.duration.minutes > 0) {
    return `${this.duration.hours} hours ${this.duration.minutes} minutes`;
  }
  return `${this.duration.hours} hours`;
});

// Method to add a student
courseSchema.methods.enrollStudent = async function (userId) {
  if (!this.students.includes(userId)) {
    this.students.push(userId);
    this.enrollmentCount += 1;
    await this.save();
  }
  return this;
};

// Method to update rating
courseSchema.methods.updateRating = async function (newRating) {
  const totalRatings = this.rating.average * this.rating.count;
  this.rating.count += 1;
  this.rating.average = (totalRatings + newRating) / this.rating.count;
  await this.save();
  return this;
};

// Ensure virtuals are included in JSON
courseSchema.set("toJSON", { virtuals: true });
courseSchema.set("toObject", { virtuals: true });

const Course = model("Course", courseSchema);
export default Course;
