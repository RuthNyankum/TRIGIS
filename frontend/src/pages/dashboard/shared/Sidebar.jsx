import React from "react";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { handleLogout } from "../../../utils/handleLogout";
import {
  adminMenuItems,
  studentMenuItems,
} from "../../../constants/sidebarMenuItems";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  userRole = "admin",
  userData = {},
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = userRole === "admin" ? adminMenuItems : studentMenuItems;

  const userName =
    userData.name ||
    userData.fullName ||
    (userRole === "admin" ? "Administrator" : "Student");

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-0 h-full
          bg-gradient-to-b from-purple-900 to-purple-700 text-white
          transition-all duration-300 ease-in-out
          flex flex-col z-50 shadow-2xl
          ${
            sidebarOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full w-64 md:translate-x-0 md:w-20"
          }
        `}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-purple-600">
          {sidebarOpen && (
            <div>
              <h2 className="text-xl font-bold">
                {userRole === "admin" ? "Admin Panel" : "Student Portal"}
              </h2>
              <p className="text-xs text-purple-200 mt-1">
                {userRole === "admin"
                  ? "Manage Platform"
                  : "Learning Dashboard"}
              </p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-purple-600 rounded-lg transition-colors ml-auto"
          >
            {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation */}
        {/* <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleLinkClick}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-purple-600 to-yellow-400 shadow-lg"
                    : "hover:bg-purple-600/50"
                }`}
                title={!sidebarOpen ? item.label : ""}
              >
                <Icon size={22} />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav> */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleLinkClick}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-purple-600 to-yellow-400 shadow-lg"
                    : "hover:bg-purple-600/50"
                }`}
                title={!sidebarOpen ? item.label : ""}
              >
                <Icon size={22} />
                {sidebarOpen && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}

          {/* ✅ Only visible to Superadmin */}
          {userData?.role === "superadmin" && (
            <Link
              to="/admin/admins"
              onClick={handleLinkClick}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isActive("/admin/admins")
                  ? "bg-gradient-to-r from-purple-600 to-yellow-400 shadow-lg"
                  : "hover:bg-purple-600/50"
              }`}
              title={!sidebarOpen ? "Manage Admins" : ""}
            >
              <FaUserShield size={22} />
              {sidebarOpen && (
                <span className="font-medium">Manage Admins</span>
              )}
            </Link>
          )}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-purple-600">
          {sidebarOpen && (
            <div className="mb-3 p-3 bg-purple-800/50 backdrop-blur-sm rounded-lg border border-purple-500">
              <p className="text-sm font-semibold truncate">{userName}</p>
              <p className="text-xs text-purple-200 truncate">
                {userRole === "admin" ? "Administrator" : "Student"}
              </p>
            </div>
          )}
          <button
            className="w-full flex items-center gap-3 p-3 hover:bg-purple-600 rounded-lg transition-colors"
            onClick={() => handleLogout(navigate)}
          >
            <FaSignOutAlt size={22} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
