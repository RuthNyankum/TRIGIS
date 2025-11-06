// controllers/settingsController.js
import UserSettings from "../models/userSettings.js";
import User from "../models/user.js";

// @desc    Get user settings
// @route   GET /api/settings
// @access  Private
export const getUserSettings = async (req, res) => {
  try {
    let settings = await UserSettings.findOne({ userId: req.user._id });

    // Create default settings if none exist
    if (!settings) {
      settings = await UserSettings.create({
        userId: req.user._id,
        emailNotifications: true,
        orderUpdates: true,
        marketingEmails: false,
        twoFactorAuth: false,
        publicProfile: true,
        showEmail: false,
      });
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching settings",
      error: error.message,
    });
  }
};

// @desc    Update user settings
// @route   PUT /api/settings
// @access  Private
export const updateUserSettings = async (req, res) => {
  try {
    const {
      displayName,
      bio,
      publicProfile,
      showEmail,
      emailNotifications,
      orderUpdates,
      marketingEmails,
      twoFactorAuth,
    } = req.body;

    let settings = await UserSettings.findOne({ userId: req.user._id });

    if (!settings) {
      settings = await UserSettings.create({
        userId: req.user._id,
        ...req.body,
      });
    } else {
      // Update only provided fields
      if (displayName !== undefined) settings.displayName = displayName;
      if (bio !== undefined) settings.bio = bio;
      if (publicProfile !== undefined) settings.publicProfile = publicProfile;
      if (showEmail !== undefined) settings.showEmail = showEmail;
      if (emailNotifications !== undefined)
        settings.emailNotifications = emailNotifications;
      if (orderUpdates !== undefined) settings.orderUpdates = orderUpdates;
      if (marketingEmails !== undefined)
        settings.marketingEmails = marketingEmails;
      if (twoFactorAuth !== undefined) settings.twoFactorAuth = twoFactorAuth;

      await settings.save();
    }

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      data: settings,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({
      success: false,
      message: "Error updating settings",
      error: error.message,
    });
  }
};

// @desc    Change password
// @route   PUT /api/settings/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password",
      });
    }

    // Get user with password
    const user = await User.findById(req.user._id).select("+password");

    // Check current password (assuming you have a comparePassword method)
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({
      success: false,
      message: "Error changing password",
      error: error.message,
    });
  }
};
