import React, { useState } from "react";
import { FiUser, FiLock, FiBell, FiSettings, FiUpload } from "react-icons/fi";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSettings />;
      case "platform":
        return <PlatformManagement />;
      case "appearance":
        return <AppearanceSettings />;
      case "security":
        return <SecuritySettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-[#7E1394] to-[#CCD431] text-transparent bg-clip-text">
        Admin Settings
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white p-5 rounded-2xl shadow-md">
          <ul className="space-y-4">
            <SidebarItem
              icon={<FiUser />}
              label="Profile Settings"
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
            <SidebarItem
              icon={<FiSettings />}
              label="Platform Management"
              active={activeTab === "platform"}
              onClick={() => setActiveTab("platform")}
            />
            <SidebarItem
              icon={<FiUpload />}
              label="Appearance"
              active={activeTab === "appearance"}
              onClick={() => setActiveTab("appearance")}
            />
            <SidebarItem
              icon={<FiLock />}
              label="Security & Roles"
              active={activeTab === "security"}
              onClick={() => setActiveTab("security")}
            />
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-md">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, active, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
      active
        ? "bg-gradient-to-r from-[#7E1394] to-[#CCD431] text-white"
        : "hover:bg-gray-100 text-gray-700"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </li>
);

const ProfileSettings = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-[#7E1394]">
      Profile Settings
    </h2>
    <form className="space-y-4">
      <InputField label="Full Name" placeholder="Enter your name" />
      <InputField label="Email" placeholder="admin@example.com" type="email" />
      <InputField label="Phone" placeholder="+233 200 000 000" />
      <InputField label="Change Password" type="password" />
      <button className="bg-gradient-to-r from-[#7E1394] to-[#CCD431] text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition">
        Save Changes
      </button>
    </form>
  </div>
);

const PlatformManagement = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-[#7E1394]">
      Platform Management
    </h2>
    <div className="space-y-3">
      <Toggle label="Allow new student signups" />
      <Toggle label="Enable email notifications" />
      <Toggle label="Require admin approval for new freelancers" />
    </div>
    <div className="mt-6">
      <label className="block text-gray-700 font-medium mb-2">
        Platform Commission Rate (%)
      </label>
      <input
        type="number"
        placeholder="e.g., 10"
        className="w-40 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7E1394]"
      />
    </div>
  </div>
);

const AppearanceSettings = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-[#7E1394]">
      Appearance Settings
    </h2>
    <div className="space-y-4">
      <UploadField label="Upload Logo" />
      <UploadField label="Upload Favicon" />
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Brand Colors
        </label>
        <div className="flex gap-4">
          <ColorSwatch color="#7E1394" label="Purple" />
          <ColorSwatch color="#CCD431" label="Yellow" />
        </div>
      </div>
    </div>
  </div>
);

const SecuritySettings = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-[#7E1394]">
      Security & Roles
    </h2>
    <div className="space-y-3">
      <Toggle label="Enable Two-Factor Authentication" />
      <Toggle label="Send login alerts via email" />
    </div>
    <div className="mt-6">
      <label className="block text-gray-700 font-medium mb-2">
        Add Co-Admin
      </label>
      <input
        type="email"
        placeholder="Enter co-admin email"
        className="border rounded-lg px-3 py-2 w-72 focus:ring-2 focus:ring-[#7E1394]"
      />
      <button className="ml-3 bg-[#7E1394] text-white px-4 py-2 rounded-xl hover:opacity-90">
        Invite
      </button>
    </div>
  </div>
);

// --- Reusable Components ---
const InputField = ({ label, placeholder, type = "text" }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#7E1394]"
    />
  </div>
);

const Toggle = ({ label }) => (
  <label className="flex items-center justify-between w-full cursor-pointer">
    <span className="text-gray-700 font-medium">{label}</span>
    <input
      type="checkbox"
      className="toggle-checkbox accent-[#7E1394] w-5 h-5"
    />
  </label>
);

const UploadField = ({ label }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      type="file"
      className="border w-full px-3 py-2 rounded-lg cursor-pointer"
    />
  </div>
);

const ColorSwatch = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-6 h-6 rounded-full border-2"
      style={{ backgroundColor: color }}
    ></div>
    <span>{label}</span>
  </div>
);

export default AdminSettings;
