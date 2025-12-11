// import mongoose from "mongoose";

// const serviceSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Service title is required"],
//       trim: true,
//       maxlength: [100, "Title cannot exceed 100 characters"],
//     },
//     description: {
//       type: String,
//       required: [true, "Service description is required"],
//       maxlength: [2000, "Description cannot exceed 2000 characters"],
//     },
//     shortDescription: {
//       type: String,
//       maxlength: [200, "Short description cannot exceed 200 characters"],
//     },
//     category: {
//       type: String,
//       required: true,
//       enum: ["Academic", "Professional", "Business", "Research", "Support"],
//     },
//     price: {
//       type: Number,
//       required: [true, "Service price is required"],
//       min: [0, "Price cannot be negative"],
//     },
//     pricingType: {
//       type: String,
//       enum: ["fixed", "hourly", "project-based", "monthly"],
//       default: "fixed",
//     },
//     thumbnail: {
//       type: String,
//       default: null,
//     },
//     // Default styling when no thumbnail is uploaded
//     defaultCardColor: {
//       type: String,
//       enum: [
//         "purple",
//         "blue",
//         "green",
//         "red",
//         "yellow",
//         "indigo",
//         "teal",
//         "pink",
//       ],
//       default: "blue",
//     },
//     icon: {
//       type: String, // Icon name from react-icons
//       default: "FaBriefcase",
//     },
//     status: {
//       type: String,
//       enum: ["active", "inactive", "archived"],
//       default: "active",
//     },
//     features: [
//       {
//         type: String,
//       },
//     ],
//     deliveryTime: {
//       type: String, // e.g., "2-3 days", "1 week", "1 month"
//     },
//     duration: {
//       type: String, // e.g., "1 hour", "ongoing"
//     },
//     requirements: [String],
//     tags: [String],
//     provider: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     providerName: {
//       type: String,
//     },
//     rating: {
//       type: Number,
//       default: 0,
//       min: 0,
//       max: 5,
//     },
//     totalRatings: {
//       type: Number,
//       default: 0,
//     },
//     totalOrders: {
//       type: Number,
//       default: 0,
//     },
//     isPopular: {
//       type: Boolean,
//       default: false,
//     },
//     isFeatured: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Index for search functionality
// serviceSchema.index({ title: "text", description: "text" });

// const Service = mongoose.model("Service", serviceSchema);
// export default Service;

import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Service description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    shortDescription: {
      type: String,
      maxlength: [200, "Short description cannot exceed 200 characters"],
    },
    category: {
      type: String,
      required: true,
      enum: ["Academic", "Professional", "Business", "Research", "Support"],
    },
    price: {
      type: Number,
      required: [true, "Service price is required"],
      min: [0, "Price cannot be negative"],
    },
    pricingType: {
      type: String,
      enum: ["fixed", "hourly", "project-based", "monthly"],
      default: "fixed",
    },
    thumbnail: {
      type: String,
      default: null,
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
      default: "blue",
    },

    icon: {
      type: String,
      default: "FaBriefcase",
    },

    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },

    features: [
      {
        type: String,
      },
    ],

    deliveryTime: {
      type: String,
    },

    duration: {
      type: String,
    },

    requirements: [String],
    tags: [String],

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    providerName: {
      type: String,
    },

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

    totalOrders: {
      type: Number,
      default: 0,
    },

    isPopular: {
      type: Boolean,
      default: false,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Text index for search
serviceSchema.index({ title: "text", description: "text" });

/* ---------------------------------------------
   AUTO-CONVERT CARD COLOR TO LOWERCASE
----------------------------------------------*/
serviceSchema.pre("save", function (next) {
  if (this.defaultCardColor) {
    this.defaultCardColor = this.defaultCardColor.toLowerCase();
  }
  next();
});

serviceSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.defaultCardColor) {
    update.defaultCardColor = update.defaultCardColor.toLowerCase();
  }
  next();
});

export default mongoose.model("Service", serviceSchema);
