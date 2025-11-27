import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../../utils/handleLogout";
import {
  FaBell,
  FaSearch,
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

// Helper function to get initials from name
const getInitials = (name) => {
  if (!name) return "U";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const Topbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [user, setUser] = useState({});
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const userName =
    user.fullName ||
    user.name ||
    (user.role === "superadmin"
      ? "Super Admin"
      : user.role === "admin"
      ? "Admin User"
      : "Student");

  const userEmail = user.email || "user@example.com";
  const userInitials = user.initials || getInitials(userName);
  const userRoleDisplay =
    user.role === "superadmin"
      ? "Super Admin"
      : user.role === "admin"
      ? "Administrator"
      : "Student";

  const welcomeMessage =
    user.role === "superadmin"
      ? "You have full control over the platform"
      : user.role === "admin"
      ? "Here's what's happening with your platform today"
      : "Continue your learning journey";

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      message: "New student enrolled in Creative Writing",
      time: "5 mins ago",
      unread: true,
    },
    {
      id: 2,
      message: "Payment received: GH₵ 150",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      message: "New service order received",
      time: "2 hours ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;
  const firstName = userName.split(" ")[0];

  return (
    <div className="bg-white border-b border-purple-100 sticky top-0 z-30 shadow-sm">
      <div className="px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
        {/* LEFT SECTION */}
        <div className="flex items-center gap-3 flex-1">
          {/* Sidebar Toggle (Mobile) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block md:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="dashboard-sidebar"
          >
            <FaBars size={22} className="text-purple-700" />
          </button>

          {/* Welcome Message */}
          <div className="hidden md:block">
            <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent">
              Welcome Back, {firstName}
            </h1>
            <p className="text-gray-600 text-xs lg:text-sm hidden lg:block">
              {welcomeMessage}
            </p>
          </div>

          {/* Mobile Welcome Text */}
          <div className="md:hidden">
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-yellow-400 bg-clip-text text-transparent">
              Hi, {firstName}
            </h1>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Search Icon */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="md:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors"
          >
            <FaSearch size={18} className="text-purple-600" />
          </button>

          {/* Desktop Search Bar */}
          {/* <div className="relative hidden md:block">
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none w-48 lg:w-64 text-sm bg-purple-50/30 transition-all duration-300"
            />
          </div> */}

          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            {/* <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-purple-50 rounded-lg transition-colors"
            >
              <FaBell size={20} className="text-purple-600" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-purple-600 to-yellow-400 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-lg">
                  {unreadCount}
                </span>
              )}
            </button> */}

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border-2 border-purple-100 z-50 max-h-[80vh] overflow-hidden">
                <div className="p-4 border-b border-purple-100 flex justify-between items-center bg-gradient-to-r from-purple-50 to-yellow-50">
                  <h3 className="font-bold text-gray-800">Notifications</h3>
                  <button className="text-sm text-purple-600 hover:text-yellow-500 font-semibold transition-colors">
                    Mark all read
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-purple-50 cursor-pointer border-b border-purple-50 transition-colors ${
                        notification.unread ? "bg-purple-50/50" : ""
                      }`}
                    >
                      <p className="text-sm text-gray-800 font-medium">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center border-t border-purple-100 bg-purple-50/30">
                  <button className="text-sm text-purple-600 hover:text-yellow-500 font-semibold transition-colors">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative " ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 lg:gap-3 hover:bg-purple-50 p-2 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-600 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {userInitials}
              </div>
              <div className="text-left hidden lg:block cursor-pointer">
                <p className="font-semibold text-gray-800 text-sm">
                  {userName}
                </p>
                <p className="text-purple-600 text-xs font-medium">
                  {userRoleDisplay}
                </p>
              </div>
              <FaChevronDown
                size={16}
                className="text-purple-600 hidden md:block"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-2 border-purple-100 z-50 overflow-hidden">
                <div className="p-4 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-yellow-50">
                  <p className="font-semibold text-gray-800">{userName}</p>
                  <p className="text-sm text-gray-600">{userEmail}</p>
                </div>
                <div className="py-2">
                  {/* <button className="w-full px-4 py-2 text-left hover:bg-purple-50 flex items-center gap-3 text-gray-700 transition-colors">
                    <FaUser size={16} className="text-purple-600" />
                    <span className="text-sm">My Profile</span>
                  </button> */}

                  <button
                    onClick={() => {
                      // Map superadmin to admin route since they share the same dashboard
                      const role =
                        user.role === "superadmin" ? "admin" : user.role;
                      navigate(`/${role}/settings`);
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-purple-50 flex items-center gap-3 text-gray-700 transition-colors cursor-pointer"
                  >
                    <FaCog size={16} className="text-purple-600" />
                    <span className="text-sm">Settings</span>
                  </button>
                </div>
                <div className="border-t border-purple-100 py-2 bg-purple-50/30">
                  {/* <button
                    className="w-full px-4 py-2 text-left hover:bg-purple-100 flex items-center gap-3 text-red-600 transition-colors"
                    onClick={() => handleLogout(navigate)}
                  >
                    <FaSignOutAlt size={16} />
                    <span className="text-sm font-medium cursor-pointer">
                      Logout
                    </span>
                  </button> */}
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-purple-100 flex items-center gap-3 text-red-600 transition-colors"
                    onClick={() => handleLogout(navigate, dispatch)}
                  >
                    <FaSignOutAlt size={16} />
                    <span className="text-sm font-medium cursor-pointer">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {/* {showSearch && (
        <div className="md:hidden px-4 pb-3 border-t border-purple-100 bg-purple-50/30">
          <div className="relative">
            <FaSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm bg-white transition-all duration-300"
              autoFocus
            />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Topbar;
