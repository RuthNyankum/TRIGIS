// models/platformSettings.js
import mongoose from "mongoose";

const platformSettingsSchema = new mongoose.Schema(
  {
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    allowNewRegistrations: {
      type: Boolean,
      default: true,
    },
    autoApproveWriters: {
      type: Boolean,
      default: false,
    },
    commissionRate: {
      type: Number,
      default: 15,
      min: 0,
      max: 100,
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one platform settings document exists
platformSettingsSchema.statics.getPlatformSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

export default mongoose.model("PlatformSettings", platformSettingsSchema);
