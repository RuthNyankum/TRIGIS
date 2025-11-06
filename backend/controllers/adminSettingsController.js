// controllers/adminSettingsController.js
import PlatformSettings from "../models/platformSettings.js";

// @desc    Get platform settings
// @route   GET /api/admin/settings
// @access  Private/Admin
export const getPlatformSettings = async (req, res) => {
  try {
    const settings = await PlatformSettings.getPlatformSettings();

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching platform settings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching platform settings",
      error: error.message,
    });
  }
};

// @desc    Update platform settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
export const updatePlatformSettings = async (req, res) => {
  try {
    const {
      maintenanceMode,
      allowNewRegistrations,
      autoApproveWriters,
      commissionRate,
    } = req.body;

    let settings = await PlatformSettings.getPlatformSettings();

    // Update fields
    if (maintenanceMode !== undefined)
      settings.maintenanceMode = maintenanceMode;
    if (allowNewRegistrations !== undefined)
      settings.allowNewRegistrations = allowNewRegistrations;
    if (autoApproveWriters !== undefined)
      settings.autoApproveWriters = autoApproveWriters;
    if (commissionRate !== undefined) {
      if (commissionRate < 0 || commissionRate > 100) {
        return res.status(400).json({
          success: false,
          message: "Commission rate must be between 0 and 100",
        });
      }
      settings.commissionRate = commissionRate;
    }

    settings.lastUpdatedBy = req.user._id;
    await settings.save();

    res.status(200).json({
      success: true,
      message: "Platform settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error updating platform settings:", error);
    res.status(500).json({
      success: false,
      message: "Error updating platform settings",
      error: error.message,
    });
  }
};
