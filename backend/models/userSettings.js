// models/userSettings.js
import mongoose from "mongoose";

const userSettingsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    // Profile Settings
    displayName: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    publicProfile: {
      type: Boolean,
      default: true,
    },
    showEmail: {
      type: Boolean,
      default: false,
    },
    // Notification Settings
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    orderUpdates: {
      type: Boolean,
      default: true,
    },
    marketingEmails: {
      type: Boolean,
      default: false,
    },
    // Security Settings
    twoFactorAuth: {
      type: Boolean,
      default: false,
    },
    twoFactorSecret: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserSettings", userSettingsSchema);
