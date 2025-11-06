// src/pages/dashboard/shared/Settings.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaUser,
  FaBell,
  FaLock,
  FaCreditCard,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaEnvelope,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";
import "../../../styles/settings.css";

export default function SettingsPage({ userRole }) {
  // Get the actual user from localStorage to check if superadmin
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setCurrentUser(storedUser);
  }, []);

  // Determine if we should show admin settings
  const isAdmin =
    userRole === "admin" ||
    currentUser.role === "admin" ||
    currentUser.role === "superadmin";

  const [settings, setSettings] = useState({
    displayName: "",
    bio: "",
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false,
    twoFactorAuth: false,
    publicProfile: true,
    showEmail: false,
    autoApprove: false,
    maintenanceMode: false,
    allowNewRegistrations: true,
    commissionRate: 15,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Fetch settings on component mount
  useEffect(() => {
    fetchSettings();
  }, [isAdmin]);

  const fetchSettings = async () => {
    try {
      const endpoint = isAdmin ? "/api/admin/settings" : "/api/settings";

      const { data } = await axios.get(endpoint, {
        withCredentials: true,
      });

      setSettings((prev) => ({ ...prev, ...data.data }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error(error.response?.data?.message || "Failed to load settings");
      setLoading(false);
    }
  };

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handlePasswordInputChange = (key, value) => {
    setPasswordData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      const endpoint = isAdmin ? "/api/admin/settings" : "/api/settings";

      await axios.put(endpoint, settings, {
        withCredentials: true,
      });

      toast.success("Settings saved successfully!");
      setSaving(false);
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error(error.response?.data?.message || "Failed to save settings");
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    try {
      setChangingPassword(true);

      await axios.put(
        "/api/settings/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setChangingPassword(false);
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.message || "Failed to change password");
      setChangingPassword(false);
    }
  };

  const handleCancel = () => {
    fetchSettings(); // Reset to original settings
    toast.info("Changes discarded");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">
            {isAdmin
              ? "Manage platform settings and configurations"
              : "Manage your account preferences"}
          </p>
        </div>

        {/* Student Settings */}
        {!isAdmin && (
          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaUser className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Profile Settings
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your display name"
                    value={settings.displayName || ""}
                    onChange={(e) =>
                      handleInputChange("displayName", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    rows="3"
                    value={settings.bio || ""}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <FaGlobe size={20} className="text-gray-600" />
                    <span className="text-gray-700">Public Profile</span>
                  </div>
                  <div
                    className={`toggle-switch ${
                      settings.publicProfile ? "active" : ""
                    }`}
                    onClick={() => handleToggle("publicProfile")}
                  >
                    <div className="toggle-knob" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <FaEnvelope size={20} className="text-gray-600" />
                    <span className="text-gray-700">Show Email on Profile</span>
                  </div>
                  <div
                    className={`toggle-switch ${
                      settings.showEmail ? "active" : ""
                    }`}
                    onClick={() => handleToggle("showEmail")}
                  >
                    <div className="toggle-knob" />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaBell className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Notifications
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-gray-700 font-medium">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-500">
                      Receive email updates about your account
                    </p>
                  </div>
                  <div
                    className={`toggle-switch ${
                      settings.emailNotifications ? "active" : ""
                    }`}
                    onClick={() => handleToggle("emailNotifications")}
                  >
                    <div className="toggle-knob" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-gray-700 font-medium">Order Updates</p>
                    <p className="text-sm text-gray-500">
                      Get notified about order status changes
                    </p>
                  </div>
                  <div
                    className={`toggle-switch ${
                      settings.orderUpdates ? "active" : ""
                    }`}
                    onClick={() => handleToggle("orderUpdates")}
                  >
                    <div className="toggle-knob" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-gray-700 font-medium">
                      Marketing Emails
                    </p>
                    <p className="text-sm text-gray-500">
                      Receive promotional offers and news
                    </p>
                  </div>
                  <div
                    className={`toggle-switch ${
                      settings.marketingEmails ? "active" : ""
                    }`}
                    onClick={() => handleToggle("marketingEmails")}
                  >
                    <div className="toggle-knob" />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaLock className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Security
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-gray-700 font-medium">
                      Two-Factor Authentication
                    </p>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security
                    </p>
                  </div>
                  <div
                    className={`toggle-switch ${
                      settings.twoFactorAuth ? "active" : ""
                    }`}
                    onClick={() => handleToggle("twoFactorAuth")}
                  >
                    <div className="toggle-knob" />
                  </div>
                </div>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaCreditCard className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Methods
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Manage your payment methods for quick checkout
                </p>
                <button className="w-full px-4 py-2 gradient-bg text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Add Payment Method
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="px-6 py-2 gradient-bg text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* Admin/Superadmin Settings */}
        {isAdmin && (
          <div className="space-y-6">
            {/* Platform Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaCog className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Platform Settings
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-gray-700 font-medium">
                      Maintenance Mode
                    </p>
                    <p className="text-sm text-gray-500">
                      Temporarily disable the platform for updates
                    </p>
                  </div>
                  <div
                    className={`toggle-switch ${
                      settings.maintenanceMode ? "active" : ""
                    }`}
                    onClick={() => handleToggle("maintenanceMode")}
                  >
                    <div className="toggle-knob" />
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-gray-700 font-medium">
                      Allow New Registrations
                    </p>
                    <p className="text-sm text-gray-500">
                      Enable or disable new user sign-ups
                    </p>
                  </div>
                  <div
                    className={`toggle-switch ${
                      settings.allowNewRegistrations ? "active" : ""
                    }`}
                    onClick={() => handleToggle("allowNewRegistrations")}
                  >
                    <div className="toggle-knob" />
                  </div>
                </div>
              </div>
            </div>

            {/* User Management */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaUsers className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  User Management
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-gray-700 font-medium">
                      Auto-Approve Writers
                    </p>
                    <p className="text-sm text-gray-500">
                      Automatically approve new writer applications
                    </p>
                  </div>
                  <div
                    className={`toggle-switch ${
                      settings.autoApprove ? "active" : ""
                    }`}
                    onClick={() => handleToggle("autoApprove")}
                  >
                    <div className="toggle-knob" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                    Manage Users
                  </button>
                  <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                    Manage Writers
                  </button>
                </div>
              </div>
            </div>

            {/* Financial Settings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaCreditCard className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Financial Settings
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Commission Rate (%)
                  </label>
                  <input
                    type="number"
                    value={settings.commissionRate}
                    onChange={(e) =>
                      handleInputChange("commissionRate", e.target.value)
                    }
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Current rate: {settings.commissionRate}%
                  </p>
                </div>
                <button className="w-full px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                  View Payment Reports
                </button>
              </div>
            </div>

            {/* Content Management */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaFileAlt className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Content Management
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Manage orders, reviews, and platform content
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                    Manage Orders
                  </button>
                  <button className="px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                    Moderate Reviews
                  </button>
                </div>
              </div>
            </div>

            {/* Security & Compliance */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaShieldAlt className="text-purple-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">
                  Security & Compliance
                </h2>
              </div>
              <div className="space-y-4">
                <button className="w-full px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                  View Activity Logs
                </button>
                <button className="w-full px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                  Data Export & Privacy
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="px-6 py-2 gradient-bg text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Change Password
                </h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleChangePassword}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        handlePasswordInputChange(
                          "currentPassword",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        handlePasswordInputChange("newPassword", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        handlePasswordInputChange(
                          "confirmPassword",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    disabled={changingPassword}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={changingPassword}
                    className="px-6 py-2 gradient-bg text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {changingPassword ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
