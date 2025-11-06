import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      trim: true,
      match: [
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        "Please provide a valid phone number",
      ],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },
    service: {
      type: String,
      required: [true, "Service selection is required"],
      enum: [
        "Content Writing & Copywriting",
        "Digital Marketing Strategy",
        "Brand Storytelling",
        "Course Development",
        "Email Marketing",
        "Content Consulting",
        "SEO Content Writing",
        "Social Media Management",
      ],
    },
    projectType: {
      type: String,
      enum: [
        "One-time Project",
        "Ongoing Partnership",
        "Course Enrollment",
        "Consultation",
        "Custom Package",
        "",
      ],
    },
    budget: {
      type: String,
      enum: [
        "Under GH₵500",
        "GH₵500 - GH₵1,000",
        "GH₵1,000 - GH₵2,500",
        "GH₵2,500 - GH₵5,000",
        "GH₵5,000+",
        "Let's discuss",
        "",
      ],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "completed", "archived"],
      default: "new",
    },
    responded: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
contactSchema.index({ email: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

// Virtual for full name
contactSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Method to mark as responded
contactSchema.methods.markAsResponded = async function () {
  this.responded = true;
  this.status = "contacted";
  return await this.save();
};

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
